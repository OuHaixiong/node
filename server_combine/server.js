// 子进程（服务进程）server.js

// 下面的代码实现了：代码在检查了请求的所有文件是否有效之后，立即就输出了响应头，并接着一边按顺序读取文件一边输出响应内容。并且，在读取文件时，代码直接使用了只读数据流来简化代码
// 实现了js或css文件的合并输出

const fs = require('fs'), path = require('path'), http = require('http'); // 引入nodejs的基础包
var MIME = {
	'.css' : 'text/css',
	'.js'  : 'application/javascript'
};

/**
 * 合并文件
 * @param pathnames
 * @param callback
 */
function combineFiles(pathnames, callback) {
    var output = [];
    (function next(i, len) {
	if (i < len) {
	    fs.readFile(pathnames[i], function (err, data) {
		if (err) {
		    callback(err);
		} else {
		    output.push(data);
		    next(i+1, len);
		}
	    });
	} else {
	    callback(null, Buffer.concat(output));
	}
    }(0, pathnames.length));
}

/**
 * 解析请求路径，返回所有的绝对路径和文件类型
 * @param string root
 * @param string url
 * @return Object
 */
function parseUrl(root, url) {
    var base, pathnames, parts;
    // /foo/baz.js
    // /foo/bar.js,foo/baz.js
    // /foo/??bar.js,baz.js
    if (url.indexOf('??') === -1) { // string.indexOf('XX') 查找XX在字符串中首次出现的位置。-1代表没有找到，找到返回位置值
	url = url.replace('/', '/??'); // 用一个字符串替换另一个字符串[或替换一个与正则表达式匹配的子串]，注意此函数只会替换一次
    } // /foo/??bar.js,baz.js  /??foo/bar.js,foo/baz.js
    parts = url.split('??'); // .split() 用一个字符串分隔一个字符，返回数组
    base = parts[0];
    pathnames = parts[1].split(',').map(function (value) { // Array.map() 对数组的每个元素调用自定义的回调函数进行处理并返回包含结果的数组
	return path.join(root, base, value);
    });
    return {
        'mime' : MIME[path.extname(pathnames[0])] || 'text/plain', // 对象的访问方式可以和数组的一样，且如果不存在此key值是不会报错的，
        // 如果访问一个数组或对象时，不存在此键，要获取值时，返回的值为undefined，undefined在判断里面
        'pathnames': pathnames
    };
}

/**
 * 判断所有的文件，看是否存在。只要有一个不存在就抛错误
 * @param array pathnames 文件路径数组
 * @param Object callback 回调函数
 */
function validateFiles(pathnames, callback) {
    (function next(i, len) {
	if (i < len) {
	    fs.stat(pathnames[i], function (err, stats) { // fs.stat() 获取文件信息。err：异常参数，stats：文件信息对象，数据如下：
		/* { dev: 64768,
		  mode: 16893,
		  nlink: 2,
		  uid: 0,
		  gid: 0,
		  rdev: 0,
		  blksize: 4096,
		  ino: 839603,
		  size: 4096,
		  blocks: 8,
		  atime: Thu Dec 08 2016 21:48:38 GMT+0800 (CST),
		  mtime: Thu Dec 08 2016 21:46:19 GMT+0800 (CST),
		  ctime: Thu Dec 08 2016 21:46:19 GMT+0800 (CST),
		  birthtime: Thu Dec 08 2016 21:46:19 GMT+0800 (CST) } */
		if (err) {
		    callback(err);
		} else if (!stats.isFile()) { // 判断是否为文件，如果不是文件，则抛异常
		    callback(new Error());
		} else {
		    next(i+1, len);
		}
	    });
	} else {
	    callback(null, pathnames);
	}
    }(0, pathnames.length));
}

/**
 * 输出js文件
 * @param array pathnames 文件路径数组
 * @param Object response ServerResponse对象
 */
function outputFiles(pathnames, response) {
    (function next(i, len) { // 循环处理
	if (i<len) {
	    var reader = fs.createReadStream(pathnames[i]); // 创建文件读取流。fs.createReadStream(欲读取的文件路径, [(object) 数组对象])
	    // reader 为 ReadStream对象
	    reader.pipe(response, {end:false}); // 通过response对象，对数据流进行输出（边读取边输出）
	    reader.on('end', function () {
		next(i+1, len);
	    });
	} else {
	    response.end();
	}
    }(0, pathnames.length));
}

/**
 * 程序入口函数
 * @param array argv
 */
function main(argv) { // argv 是数组
    var config = JSON.parse(fs.readFileSync(argv[0], 'utf-8')), root = config.root || '.', port = config.port || 80;
    var server = http.createServer(function (request, response) { // request IncomingMessage对象。response ServerResponse对象
	var urlInfo = parseUrl(root, request.url);
	validateFiles(urlInfo.pathnames, function (err, pathnames) {
	    if (err) { // 文件出错后，err为对象
		response.writeHead(404);
		response.end(err.message);
	    } else {
		response.writeHead(200, {'Content-Type' : urlInfo.mime});
		outputFiles(pathnames, response);
	    }
	});
	
    }).listen(port);
    
    process.on('SIGTERM', function () {
        server.close(function () {
            process.exit(0);
        });
    });
}

// 运行如：node server.js config.json
main(process.argv.slice(2)); // 获取进程的所有参数
// node执行程序路径和主模块文件路径固定占据了argv[0]和argv[1]两个位置，而第一个命令行参数从argv[2]开始
// 注意此目录下的config.json为json配置数据，里面不能有注释，不能用单引号，只能为标准的json数据

// 开启进程后，在浏览器输入：http://192.168.11.186:8080/alert_ok.js,abc.js

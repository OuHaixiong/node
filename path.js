// 标准化路径
var path = require('path'); //系统标准路径包（path模块是专门用来处理文件路径的）
var cache = {};

function store(key, value) { // normalize 标准化路径
	cache[path.normalize(key)] = value;
}

store('foo/bar', 1);
console.log(cache); // { 'foo/bar': 1 }
store('foo//baz//../bar', 2);
console.log(cache); // { 'foo/bar': 2 }

var joinPath = path.join('foo/', '/baz/', '..//bar'); // 将多个路径拼接为标准路径
console.log(joinPath); // foo/bar

var extnamePath = path.extname('foo/bar.js'); // 获取文件路径中的扩展名
console.log(extnamePath); // .js


// 下面对目录进行遍历
var fs = require('fs'); // 系统文件包

/**
 * 遍历目录下的所有文件，并返回回调函数处理
 * @param string dir 需要遍历的文件夹（目录）
 * @param handleTravel callback 处理回调函数
 */
function travel(dir, callback) { // 空文件夹不返回
    fs.readdirSync(dir).forEach(function (file) { // 这里用到了文件处理，需要引入文件包
    	var filePath = path.join(dir, file);
    	if (fs.statSync(filePath).isDirectory()) {
    		travel(filePath, callback);
    	} else {
    		callback(filePath);
    	}
    });
}

var arrFilePath = [];
var num = 0;

/**
 * 处理遍历过的文件
 * @param filePath
 */
function handleTravel(filePath) {
	arrFilePath[num] = filePath;
	num++;
}
// __dirname 获取当前执行脚步所在的绝对目录（最后不包含/）
var dir = path.resolve(__dirname, './'); // 等同path.resolve(__dirname)
dir = path.join(dir, 'ba'); // 拼接路径
//console.log(dir); //返回/data/www/nodejs/afv
travel(dir, handleTravel); // 注意：回调函数不能用字符串进行传，直接传函数名就可以
// 上面的写法还可以写成： travel(dir, function(filePath) {...});
console.log(arrFilePath);


// 下面是遍历文件的异步版本（看不太懂）
/*function travel(dir, callback, finish) {
    fs.readdir(dir, function (err, files) {
        (function next(i) {
            if (i < files.length) {
                var pathname = path.join(dir, files[i]);

                fs.stat(pathname, function (err, stats) {
                    if (stats.isDirectory()) {
                        travel(pathname, callback, function () {
                            next(i + 1);
                        });
                    } else {
                        callback(pathname, function () {
                            next(i + 1);
                        });
                    }
                });
            } else {
                finish && finish();
            }
        }(0));
    });
}*/


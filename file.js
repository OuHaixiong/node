
// 下面是与文件相关的一些操作

var path = require('path'); // 系统标准路径包
var fs = require('fs'); // 系统文件处理包
/**
 * 识别和去除UTF8 BOM
 * @param pathname
 * @returns string
 */
function readText(pathname) {
	var bin = fs.readFileSync(pathname); // 同步读取一个文件到一个字符串（sync：同步耗性能一点；没有sync的函数是异步的性能更高）
	if ((bin[0] === 0xEF) && (bin[1] === 0xBB) && (bin[2] === 0xBF)) {
		bin = bin.slice(3);
	}
	
	return bin.toString('utf-8');
}

//var filePath = path.join(path.resolve(__dirname), '/data/abc.txt'); // __dirname 获取当前脚步所在的目录（绝对路径，后面不带/）
// 上面的这行可以写成
var filePath = path.resolve(__dirname, 'data/abc.txt'); // 后面的参数还可以写成如：./data/abc.txt
//console.log(path.resolve(__dirname, '../')); // 这个返回/data/www。path.resolve([from ...], to)：将参数 to 位置的字符解析到一个绝对路径里（类似php的realpath）
var contents = readText(filePath);
console.log(contents);

// 读写文件
fs.open('/path/xxx/XXX', 'r', function (err, fd) {
	// todo ...
    // 第二个参数为操作类型：
    // r : 只读
    // r+ : 读写
    // w : 重写文件
    // w+ : 重写文件，如果文件不存在则创建
    // a : 读写文件，在文件末尾追加
    // a+ : 读写文件，如果文件不存在则创建
});

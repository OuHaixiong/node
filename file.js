
// 下面是与文件相关的一些操作

var path = require('path'); // 系统标准路径包
var fs = require('fs'); // 系统文件处理包
/**
 * 识别和去除UTF8 BOM
 * @param pathname
 * @returns string
 */
function readText(pathname) {
	var bin = fs.readFileSync(pathname);
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

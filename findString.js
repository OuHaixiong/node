// 全文检索一个字符串
/**
 * 这个一个全文检索文件中是否包含某个字符串，速度还不错。
 * 使用如下：
 * node findString.js '/data/www/mvc' "mail" 或 node findString.js '/data/www/mvc' 'getDefaultRow\('
 * 
 */

var path = require('path');
var fs = require('fs');
var directoryPath = process.argv[2];
var lookingForString = process.argv[3];
//console.log(process.argv);
function isDirectory(filePath) {
    if (fs.existsSync(filePath)) { // 同步接口，判断文件或文件夹（目录）是否存在
        return fs.statSync(filePath).isDirectory(); // 读取文件状态信息，也是有异步接口的：fs.stat(path, function (err, stats) {..});
    } else {
        return false;
    }
}

function isFile(filePath) {
    if (fs.existsSync(filePath)) {
        return fs.statSync(filePath).isFile(); // stat.isFile() 判断是否问文件
        // stat.isDirectory();
        // stat.isSymbolicLink(); 是否符号链接，即软链接
        // 还有很多的方法：如stat.isSocket();
    } else {
        return false;
    }
}

function readFile(filePath) {
    if (fs.existsSync(filePath)) {
        return fs.readFileSync(filePath, 'utf-8');
    } else {
        return '';
    }
}

function check(filePath) {
    var data = readFile(filePath);
    var regExp = new RegExp(lookingForString);
    if (regExp.test(data)) {
        console.log(filePath);
    }
}

function recursiveReadFile(filePath) {
    if (!fs.existsSync(filePath)) { // 判断文件是否存在。判断文件是否存在，也有异步接口的，如下：
        // fs.exists(path, function (exists) {...});
        return;
    }
    if (isFile(filePath)) {
        check(filePath);
    }
    if (isDirectory(filePath)) {
        var files = fs.readdirSync(filePath);
        files.forEach(function (value, key) {
            var tempPath = path.join(filePath, value);
            if (isDirectory(tempPath)) { // 是目录
                recursiveReadFile(tempPath);
            } //else { // 这里不能这样下，因为除了文件和文件夹外，还设有软连接等
                //check(tempPath);
            //}
            if (isFile(tempPath)) { // 是文件
                check(tempPath);
            }
        });
    }
}

recursiveReadFile(directoryPath);
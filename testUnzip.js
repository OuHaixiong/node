
var unzip = require('unzip');
var path = require('path');
var fs = require('fs');
var fstream = require('fstream');

var sourcePath = path.resolve(__dirname, 'zipFileName.zip');
var targetPath = path.resolve(__dirname, './');
// 貌似库有问题，下面两种解压文件的方式都会报错
// fs.createReadStream(sourcePath)
//     .pipe(unzip.Extract({path : targetPath}));

// var readStream = fs.createReadStream(sourcePath);
// var writeStream = fstream.Writer(targetPath);
// readStream
//     .pipe(unzip.Parse())
//     .on('entry', function (entry) {
//         var fileName = entry.path;
//         var type = entry.type;
//         var size = entry.size;
//         console.log('文件名：', fileName, ' 文件类型：', type, ' 大小：', size);
//     });


var extract = require('extract-zip');
// var sourcePathError = path.resolve(__dirname, 'testUnzip.zip');
var sourcePath = path.resolve(__dirname, 'zipFileName.zip');
extract(sourcePath, {'dir' : targetPath, 'onEntry' : function (entry, zipFile) {
    console.log('entry : ', entry);
    console.log('zip file : ', zipFile);
}}, function (err) { // 这个挺好，就算是错误的zip包也不会报致命错误
    // extraction is complete. make sure to handle the err
    if (typeof err === 'undefined') {
        console.log('解压已完成(OK成功)！！！！');
    } else {
        console.log('错误信息：', err);
    }
});



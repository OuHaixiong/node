
var path = require('path');
var fs = require('fs');
const fork = require('child_process').fork;
const spawn = require('child_process').spawn;

var arguments; //var arguments; 

var paramJson = {
    'version' : '1.0.0.1',
    'author' : 'ColorDojoFVG',
    'name' : 'AMZ Motor Shield',
    'description' : 'An Extension for arduino Motor Shield',
    'homepage' : 'https://github.com',
    'installed' : false,
    'hasUpdate' : false,
    'url' : 'http://abc.com:8080/2.4G.zip'
};
var extensionParam = paramJson;

var downloadFile = function (fileUrl) {
    // var fileName = url.parse(fileUrl).pathname.split('/').pop(); // extract the file name
    var downloadPath = path.resolve(__dirname, './ext/extensionTemp.zip');
    var fileTemp = fs.createWriteStream(downloadPath); // create an instance of writable stream
    var curl = spawn('curl', [fileUrl]); // execute curl using child_process' spawn function
    curl.stdout.on('data', function (data) { // add a 'data' event listener for the spawn instance
        fileTemp.write(data);
    });
    curl.stdout.on('end', function (data) { // add an 'end' event listener to close the writeable stream
        fileTemp.end();
        console.log('file is downloaded to ' + downloadPath);
    });
    curl.stdout.on('exit', function (code) { // when the spawn child process exits, check if there were any errors and close the writeable stream
        if (code != 0) {
            console.log('Failed: ' + code);
        }
    });
};

var extensionListPath = path.resolve(__dirname, './ext/extensionList.json');
fs.exists(extensionListPath, function (exists) {
    var extensionList = {};
    if (exists) {
        console.log('extnesionList.json is exist');
    } else {
        console.log('extensionList.json not exist');

    }
    // 不存在或版本不对，需要下载扩展
    downloadFile(extensionParam.url);
});





arguments = process.argv.slice(2);
console.log('receive arguments: ', arguments);

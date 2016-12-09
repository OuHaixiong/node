
// net模块可用于创建Socket服务器或Socket客户端
/*const net = require('net');
net.createServer(function (response) {
    response.on('data', function (data) {
	response.write([
	    'HTTP/1.1 200 OK',
	    'Content-Type: text/plain',
	    'Content-Length:11',
	    '',
	    'Hello World'
	].join('\n'));
    });
}).listen(8080);*/

// 下面是异步拷贝目录
var child_process = require('child_process'); // 在NodeJS中，可以通过process对象感知和控制NodeJS自身进程的方方面面;process是一个全局对象
var util = require('util'); // child_process模块可以创建和控制子进程.该模块提供的API中最核心的是.spawn，其余API都是针对特定使用场景对它的进一步封装，算是一种语法糖。
// cluster模块是对child_process模块的进一步封装，专用于解决单进程NodeJS Web服务器无法充分利用多核CPU的问题。
// 使用该模块可以简化多进程服务器程序的开发，让每个核上运行一个工作进程，并统一通过主进程监听端口和分发请求。
function copy(source, target, callback) {
    child_process.exec(util.format('cp -r %s/* %s', source, target), callback);
}
//copy('data', 'ba', function (err) {
//    console.log(err); // 成功打印null
//});

process.on('uncaughtException', function (err) {
    console.log('Error: %s', err.message);
});

setTimeout(function (fn) {
    fn();
});




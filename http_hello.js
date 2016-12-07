/*
 * 创建简单的http服务
 */
var http = require('http'); // 引入http模块
http.createServer(function (request, response) { // 创建一个服务器
        console.log(request); // 返回IncomingMessage对象
	response.writeHead(200, {
		'Content-Type' : 'text/plain'
	});
	response.write('Hello');
	response.write('123'); // 参数必须是字符串或Buffer
	response.end(); // 结束输出，也可以response.end('Hello World\n');
}).listen(8100); // 监控8100端口
console.log('nodejs start listen 8100 port!');
// 在Linux系统下，监听1024以下端口需要root权限。因此，如果想监听80或443端口的话，需要使用sudo命令启动程序
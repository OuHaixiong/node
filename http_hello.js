/*
 * 创建简单的http服务
 */
var http = require('http');
http.createServer(function (request, response) {
	response.writeHead(200, {
		'Content-Type' : 'text/plain'
	});
	response.write('Hello');
	response.end();
}).listen(8100);
console.log('nodejs start listen 8100 port!');
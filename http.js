//'http'模块提供两种使用方式：
//作为服务端使用时，创建一个HTTP服务器，监听HTTP客户端请求并返回响应。
//作为客户端使用时，发起一个HTTP客户端请求，获取服务端响应。

var http = require('http');

http.createServer(function (request, response) {
    var body = [];
    
    response.writeHead(200, {'Content-Type':'text/plain'});
    
    console.log(request.method); // 请求方法；返回GET
    console.log(request.url); // 请求的url信息；返回如：/foo/bar?a=b
    console.log(request.headers); // 请求头部信息
    // 返回对象，类似如下数据
//    { host: '192.168.2.223:81',
//	  'user-agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:49.0) Gecko/20100101 Firefox/49.0',
//	  accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
//	  'accept-language': 'zh-CN,zh;q=0.8,en-US;q=0.5,en;q=0.3',
//	  'accept-encoding': 'gzip, deflate',
//	  connection: 'keep-alive',
//	  'upgrade-insecure-requests': '1' }
    
    //request.on('data', function (chunk) { // 貌似有问题
	//body.push(chunk);
	//response.write(chunk);
    //});
    
    //request.on('end', function () { // 貌似有问题
//	body = Buffer.concat(body);
//	console.log(body.toString());
	//response.end();
    //});
    response.end();
}).listen(81);


// 下面用http的客户端部分
var options = {
	hostname : 'maimengmei.com',
	port     : 80,
	path     : '/',
	method   : 'POST',
	headers  : {
	    'Content-Type' : 'application/x-www-form-urlencoded'
	}
};
var request = http.request(options, function (response) { // get 请求方法：http.get('http://www.example.com/', function (response) {});
    //console.log(response);
});
//request.write('Hello World');
//console.log(request);
request.end();


http.get('http://maimengmei.com', function (response) { // 通过get请求，获取数据，类似php的curl
    var body = [];
    console.log(response.statusCode); // 返回 200
    console.log(response.headers); // 返回如下数据：
    /*{ date: 'Tue, 22 Nov 2016 06:42:45 GMT',
	  server: 'Apache/2',
	  'last-modified': 'Thu, 07 Jan 2016 03:27:36 GMT',
	  etag: '"12e0026-61c9-528b60d4f1a00"',
	  'accept-ranges': 'bytes',
	  'content-length': '25033',
	  vary: 'Accept-Encoding,User-Agent',
	  connection: 'close',
	  'content-type': 'text/html' }*/
    response.on('data', function (chunk) {
	body.push(chunk); // 把返回的多个二进制流数据放入数组中
    });
    
    response.on('end', function () {
	body = Buffer.concat(body); // 连接多少个二进制流数据为一个二进制流数据
        console.log(body.toString()); // 这里返回响应的html
    });
    
});


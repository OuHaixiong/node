/*
下面是对请求的url进行解析的练习
                           href
 -----------------------------------------------------------------
                            host              path
                      --------------- ----------------------------
 http: // user:pass @ host.com : 8080 /p/a/t/h ?query=string #hash
 -----    ---------   --------   ---- -------- ------------- -----
protocol     auth     hostname   port pathname     search     hash
                                                ------------
                                                   query
*/

// .parse() 将一个URL字符串转换为URL对象
var url = require('url'); // 引入url模块包
var objUrl = url.parse('http://user:pass@host.com:8080/p/a/t/h?query=string#hash');
//console.log(objUrl); // 返回如下数据：
/*Url {
    protocol: 'http:',
    slashes: true,
    auth: 'user:pass',
    host: 'host.com:8080',
    port: '8080',
    hostname: 'host.com',
    hash: '#hash',
    search: '?query=string',
    query: 'query=string',
    pathname: '/p/a/t/h',
    path: '/p/a/t/h?query=string',
    href: 'http://user:pass@host.com:8080/p/a/t/h?query=string#hash' }*/
var entityUrl = url.parse('/foo/bar?a=b&ni=ma#abc', true, true);
// 如果第二个参数为true：则query为对象：{ a: 'b', ni: 'ma' }
// 第三个参数等于true时，该方法可以正确解析不带协议头的URL，例如//www.example.com/foo/bar
var stringUrl = url.format(entityUrl); // format方法允许将一个URL对象转换为URL字符串
console.log(stringUrl); // /foo/bar?a=b&ni=ma#abc
var str = url.resolve('http://www.example.com/foo/bar', '../baz'); // .resolve方法可以用于拼接URL
console.log(str); // http://www.example.com/baz

var querystring = require('querystring');
var objQuery = querystring.parse('foo=bar&baz=qux&baz=quux&corege'); // { foo: 'bar', baz: [ 'qux', 'quux' ], corege: '' }
console.log(objQuery);// parse：URL参数字符串转对象
var queryStr = querystring.stringify(objQuery); // stringify 对象转URL参数字符串
console.log(queryStr); // foo=bar&baz=qux&baz=quux&corege=

// 标准化路径
var path = require('path'); //系统标准路径包
var cache = {};

function store(key, value) { // normalize 标准化路径
	cache[path.normalize(key)] = value;
}

store('foo/bar', 1);
console.log(cache); // { 'foo/bar': 1 }
store('foo//baz//../bar', 2);
console.log(cache); // { 'foo/bar': 2 }

var joinPath = path.join('foo/', '/baz/', '..//bar'); // 将多个路径拼接为标准路径
console.log(joinPath); // foo/bar

var extnamePath = path.extname('foo/bar.js'); // 获取文件路径中的扩展名
console.log(extnamePath); // .js


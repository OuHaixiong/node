
// 下面是node.js的字符串操作

// node.js 中json对象和JSON字符串之间的相互转换
var json = {
	'name' : '欧阳海雄',
	'daughter' : ['ouyanyan', 'oumengmeng'],
	'resume': {
		'age' : 34,
		'profession' : 'programmer'
	}
};
var jsonString = JSON.stringify(json);
console.log(jsonString);
var jsonObj = JSON.parse(jsonString);
console.log(jsonObj);

// nodejs下对字符串进行md5加密
var crypto = require('crypto');
var md5String = crypto.createHash('md5').update(jsonString).digest('hex');
console.log(md5String);

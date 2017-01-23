
/**
 * 阶乘积(阶乘)
 * 计算N的阶乘（N!）, 如：6*5*4*3*2*1
 * @param int n
 * @retrun int
 */
function factorial(n) {
	if (n === 1) {
		return 1;
	} else {
		return n * factorial(n - 1);
	}
} // 陷阱： 使用递归算法编写的代码虽然简洁，但由于每递归一次就产生一次函数调用，在需要优先考虑性能时，需要把递归算法转换为循环算法，以减少函数调用次数

console.log(factorial(5));
console.log(factorial(6));

function loadScript(abc) {
    alert('Hello '+abc);
}
//window.loadScript('ouhaixiong');


console.log('---下面测试读取一个文件，其中有换行符，通过换行符切割字符串---');
const fs = require('fs');
var filePath = 'newline';
var bin = fs.readFileSync(filePath);// 同步读取一个文件到一个字符串（sync：同步耗性能一点；没有sync的函数是异步的性能更高）
var str = bin.toString('utf-8');
var arr = str.split('\n\n'); // 字符分割 . \n: 10 换行;\r: 13回车
arr.shift();
console.log(arr);// BD Address: 00:1B:10:10:01:FD [mode 1, clkoffset 0x2641]\nDevice name:    Makeblock [cached]\n
var reg = /Address:\s*([\w:]+).*mode\s*(\d+).+\nDevice\s*name:(.+)\[cached\]/ig;
var length = arr.length;
var matches = new Array();
for(var i=0; i<length; i++) {
//    matches = arr[i].match(reg); // matches里面没有$1
//    console.log(matches);
    reg.exec(arr[i]);
    console.log(RegExp.$1);
    console.log(RegExp.$2);
    console.log(RegExp.$3);
}

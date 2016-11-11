var bin = new Buffer([0x68, 0x65, 0x6c, 0x6c, 0x6f]);
var str = bin.toString('utf-8'); // hello (二进制数据转字符串)
console.log(str);

var buffer = new Buffer('hello', 'utf-8');
console.log(buffer); // <Buffer 68 65 6c 6c 6f>

var sub = buffer.slice(2); // buffer类似数组，slice类似截取从第二个开始直到最后的所有buffer，下标是以0开头
console.log(sub); // 这里返回 <Buffer 6c 6c 6f>
sub[0] = 0x65; // 这里相当于指针，修改的是原值
console.log(buffer); // 这里返回 <Buffer 68 65 65 6c 6f>

// 下面是拷贝一份Buffer
// 首先创建一个新的Buffer，并通过.copy方法把原Buffer中的数据复制过去。这个类似于申请一块新的内存，并把已有内存中的数据复制过去
var aBuffer = new Buffer([0x68, 0x65, 0x6c, 0x6c, 0x6f]);
var bBuffer = new Buffer(aBuffer.length);

aBuffer.copy(bBuffer);
bBuffer[0] = 0x48;

console.log(aBuffer); // <Buffer 68 65 65 6c 6f>
console.log(bBuffer); // <Buffer 48 65 6c 6c 6f>

// Buffer(数据块)将JS的数据处理能力从字符串扩展到了任意二进制数据

// 下面读取一个文件的数据流，并进行处理，并在处理数据前暂停数据读取，并在处理数据后继续读取数据
var fs = require('fs');
var resource = fs.createReadStream('./http_hello.js');
var doSomething = function (str) {
	console.log(str); // 这里读出来的全是数据块
};
resource.on('data', function (chunk) {
	resource.pause();
	doSomething(chunk, function () {
		resource.resume();
	});
});
resource.on('end', function() {
	cleanUp();
});

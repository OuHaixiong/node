// 这个js需要用node来执行

const fs = require('fs');

// fs.readFile('index.html', function (err, data) {
//     let p1 = new Promise(function (resolve, reject) {
//         if (err) {
//             reject(err);
//         } else {
//             resolve(data);
//         }
//     });

//     p1.then(function (value) { // 成功时回调到这里，resolve(data); 
//         // value 读取文件返回的data数据是一个Buffer
//         console.log(value.toString());
//     }, function (value) { //失败时回调到这里，reject(err)
//         console.log(value);
//     });
// });

// 下面是promise的另外一种写法：
let p1 = new Promise(function (resolve, reject) {
    fs.readFile('index.html', function (err, data) {
        if (err) {
            reject(err);
        } else {
            resolve(data);
        }
    });
});

p1.then(function (value) { // 成功时回调到这里，resolve(data); 
    // value 读取文件返回的data数据是一个Buffer
    console.log(value.toString());
}, function (value) { //失败时回调到这里，reject(err)
    // value 读取文件失败时err返回的是一个对象，如：
//     { Error: ENOENT: no such file or directory, open 'index.html1'
//     at Error (native)
//   errno: -2,
//   code: 'ENOENT',
//   syscall: 'open',
//   path: 'index.html1' }
    console.log(value);
});

// 总结，promise就是可以把异步的代码，当成同步来写，即异步处理完后，再调用then里面的回调函数（省掉了回调嵌套问题，犹如做事一样，一件一件完成）
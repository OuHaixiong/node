// 绝对路径和相对路径的区别
// 在任何时候都要使用绝对路径（只有在 require() 时才使用相对路径(./, ../) 的写法，其他地方一律使用绝对路径）
let fs = require('fs');
let path = require('path');
// 但是在require() 中使用相对路径是可以的，因为系统会自动转换为绝对路径，跟加上了__dirname的效果相同；并且它是一层一层往上查找node_modules下的模块的

console.log('__dirname:', __dirname); // 当前执行脚本所在的目录（绝对路径）；返回：/data/www/nodejs
console.log('__filename:', __filename); // 当前执行脚本所在的文件路径（绝对路径）；返回：/data/www/nodejs/path2.js
console.log('process.cwd():', process.cwd()); // 启动应用时所在的目录（绝对路径）【运行 node 命令时所在的文件夹的绝对路径】，返回：/

// let filePath = './newline'; // 相对路径，不推荐使用，是因为环境原因，有可能出现找不到该文件的可能
let filePath = path.resolve(__dirname, './newline') // 推荐使用绝对路径
console.log('filePath:', filePath); // 返回：/data/www/nodejs/newline

fs.readFile(filePath, function (err, buffer) {
  if (err) {
    console.log('error:', err);
    return;
  }
  console.log('OK');
  console.log(buffer.toString());
});

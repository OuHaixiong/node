// 异步操作

async function timeout(ms) {
  await new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function asyncPrint(value, ms) {
  await timeout(ms);
  console.log(value);
}

// asyncPrint('hello world', 50);
// console.log('OKKK');
// 这里有异步方法，所以先打印 OKKK ， 在打印 hello world
//await asyncPrint('马上', 50); // 这样写是错误的，await只能再异步函数里面

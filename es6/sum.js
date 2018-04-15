import a from './a.js';
import b from './b.js';

export default function sum() {
    return a+b;
};
// 也可以导出多个模块化的东西，如下：
// export default {a, b};
// 引用多个模块化时，如下：
// import sum from './sum.js';
// console.log(sum.a + sum.b);
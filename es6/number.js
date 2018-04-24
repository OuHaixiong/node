console.log(Number.EPSILON); // 一个常量：2.220446049250313e-16
let a = [123];
console.log(Number.isInteger(a)); // false 。 是否是整型
let b;
console.log(Number.isNaN(b)); // false
console.log(Math.acosh(3)); // 1.7627471740390859  反双曲余弦. 数学函数
console.log(Math.hypot(3,4)); // 5  该方法用于计算所有参数平方和的平方根
console.log(Math.cbrt(8)); // 2 该方法用于计算一个数的立方根，等同于Math.pow(n,1/3)方法 
console.log(Math.trunc(-2.358)); // -2   Math.trunc该方法用于取出一个小数的小数部分，返回整数部分
console.log(Math.trunc('12.89567')); // 12
console.log(Math.trunc('a')); // NaN


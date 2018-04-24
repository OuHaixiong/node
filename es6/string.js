let boolean = 'abcde'.includes('cd'); // true
console.log(boolean);
let str = "我们是好人";
boolean = str.includes('是人'); // false
console.log(boolean);
boolean = str.includes('是好'); // true
console.log(boolean);

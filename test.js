
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
}

console.log(factorial(5));
console.log(factorial(6));

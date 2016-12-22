
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
window.loadScript('ouhaixiong');
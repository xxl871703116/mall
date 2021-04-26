/**
 *  防抖函数的封装：
 * 		原理：
 * 			如果我们直接执行refresh方法，那么refresh函数会被执行30次
 * 			可以将refresh函数传入到debounce函数中进行防抖处理
 * 			之后在调用非常频繁的时候，就使用新生成的函数
 * 			而新生成的函数，并不会频繁的调用，如果下一次执行来的非常快，那么会将上一次取消掉
 */
export function debounce(func, delay) {
	let timer = null //初始化定时器
	// 执行返回的函数
	return function(...args) {
		if (timer) {
			clearTimeout() //清除上一次的定时器
		}

		timer = setTimeout(() => {
			func.apply(this, args)
		}, delay)
	}
}

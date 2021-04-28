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

function padLeftZero(str) {
  return ("00" + str).substr(str.length);
}

// 时间格式化
export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  }

  let o = {
    "M+": date.getMonth() + 1,
    "d+": date.getDate(),
    "h+": date.getHours(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds()
  };

  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + "";
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str));
    }
  }

  return fmt;
}

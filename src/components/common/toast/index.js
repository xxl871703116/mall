import Toast from "./Toast";
const obj = {}

obj.install = function (Vue) {

  // 1.创建组件构造器
  const toastConstructor = Vue.extend(Toast)

  // 2.利用组件构造器创建Toast组件对象
  const toast = new toastConstructor()

  // 3.将组件对象挂载到某一个元素上
  toast.$mount(document.createElement('div'))

  // 4.此时toast.$el就是对应上面创建的div元素了，这个时候将其添加到程序入口
  document.body.appendChild(toast.$el)

  // 挂载到原型上方便调用
  Vue.prototype.$toast = toast
}

export default obj

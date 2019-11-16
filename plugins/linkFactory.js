export default {
  install(Vue) {
    Vue.prototype.$linkFactory = (item, collection) => {
      return `<a href="/${collection}/${item.id}">${item.name}</a>`;
    }
  }
}
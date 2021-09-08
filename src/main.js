import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import FastClick from 'fastclick'
import LazyLoad from 'vue-lazyload'
Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()

FastClick.attach(document.body)

Vue.use(LazyLoad,{
  loading:require('./assets/img/common/placeholder.png')
})
new Vue({
  render: h => h(App),
  router,
  store 
}).$mount('#app')

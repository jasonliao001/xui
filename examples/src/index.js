import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
// import router from './router.config'
import xui from '../../src/index.js'
import 'packages/xui-css/src/index.css'
import '../assets/docs.css'
import isMobile from './is-mobile'

import registerRoute from './router.config'
import navConfig from './nav.config'




Vue.use(xui)
Vue.use(VueRouter)
const routesConfig = registerRoute(navConfig)
console.log(routesConfig)
const router = new VueRouter({
  routes: routesConfig
})
const isProduction = process.env.NODE_ENV === 'production'

router.beforeEach((route, redirect, next) => {

  if (route.path !== '/') {
    window.scrollTo(0, 0)
  }

  // 获取不同环境下，移动端Demo对应的地址
  const pathname = isProduction ? '/xui/mobile' : '/mobile.html'
  // 如果设备环境为移动端，则直接加载移动端Demo的地址
  if (isMobile) {
    window.location.replace(pathname)
    return
  }
  document.title = route.meta.title || document.title
    next()
})


// 完整引用

// Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app-container',
    router,
    components: { App },
    template: '<App/>'
})


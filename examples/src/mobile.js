import Vue from 'vue'
import VueRouter from 'vue-router'
import MobileApp from './MobileApp'
import xui from 'src/index'
import isMobile from './is-mobile.js'
// import Hello from '../pages/hello.vue'
import 'packages/xui-css/src/index.css'
import registerRoute from './router.config'
import navConfig from './nav.config'

import DemoList from './components/demo-list.vue'


Vue.use(xui)
Vue.use(VueRouter)


const routesConfig = registerRoute(navConfig)
routesConfig.push({
    path: '/',
    component: DemoList
})
const router = new VueRouter({
  routes: routesConfig
})

const isProduction = process.env.NODE_ENV === 'production'
// const router = new VueRouter({
//   base: isProduction ? '/xui/' : __dirname,
//   routes: [{
//     path: '/component/hello',
//     component: Hello
//   }]
// })
router.beforeEach((route, redirect, next) => {
  if (route.path !== '/') {
    window.scrollTo(0, 0)
  }
  const pathname = isProduction ? '/xui/' : '/'
  if (!isMobile) {
    window.location.replace(pathname)
    return
  }
  document.title = route.meta.title || document.title
  next()
})

new Vue({
  el: '#app-container',
  router,
  components: { MobileApp },
  template: '<MobileApp/>'
})


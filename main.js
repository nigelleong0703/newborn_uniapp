import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import request from './common/js/request.js'
import $ from './common/js/toast.js'
import uView from '@/uni_modules/uview-ui'
import tabBar_admin from 'components/tabBar/tabBar_admin.vue'


Vue.prototype.$ = $
Vue.prototype.$request = request
Vue.config.productionTip = false
Vue.use(uView)
Vue.component('tabBar-admin', tabBar_admin)

App.mpType = 'app'
const app = new Vue({
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
  createSSRApp
} from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif

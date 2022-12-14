import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import request from './common/js/request.js'
import $ from './common/js/toast.js'
import uView from '@/uni_modules/uview-ui'
import tabBar_admin from 'components/tabBar/tabBar_admin.vue'
import * as Db from './common/db.js'
import * as Config from './common/config.js'
import * as Common from './common/common.js'
import * as Api from './common/api.js'
import store from './store'

Vue.prototype.$ = $
Vue.prototype.$request = request
Vue.prototype.$api = Api;
Vue.prototype.$common = Common;
Vue.prototype.$db = Db;
Vue.prototype.$config = Config;
Vue.prototype.$store = store;
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

import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import request from './common/js/request.js'
import $ from './common/js/toast.js'
import uView from '@/uni_modules/uview-ui'
import tabBar_admin from 'components/tabBar/tabBar_admin.vue'
import tabBar_nurse from 'components/tabBar/tabBar_nurse.vue'
import tabBar_info from 'components/tabBar/tabBar_info.vue'
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
Vue.component('tabBar-nurse', tabBar_nurse)
Vue.component('tabBar-info', tabBar_info)

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

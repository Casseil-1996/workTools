import Vue from 'vue'
import App from './App.vue'
import './VueExtend'

import './registerServiceWorker'
import router from './router'
import store from './store'
import './plugins/element.js'
import './plugins/skykit.js'
import './assets/skykit.less'
import 'remixicon/fonts/remixicon.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

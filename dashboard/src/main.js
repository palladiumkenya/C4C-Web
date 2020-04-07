import Vue from 'vue'
import CKEditor from '@ckeditor/ckeditor5-vue'

// Components
import './components'

// Plugins
import './plugins'
import { sync } from 'vuex-router-sync'

import VuetifyDaterangePicker from 'vuetify-daterange-picker'
import 'vuetify-daterange-picker/dist/vuetify-daterange-picker.css'
import VueSimpleAlert from 'vue-simple-alert'

// Application imports
import App from './App'
import router from '@/router'
import store from './store'
import axios from 'axios'

require('@/store/subscriber')

axios.defaults.baseURL = 'http://c4ctest.mhealthkenya.org/api'
Vue.use(VuetifyDaterangePicker)
Vue.use(VueSimpleAlert)

// Sync store with router
sync(store, router)

Vue.config.productionTip = false

store.dispatch('auth/attempt', localStorage.getItem('token'))

Vue.use(CKEditor)

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

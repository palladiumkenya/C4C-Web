import Vue from 'vue'
import CKEditor from '@ckeditor/ckeditor5-vue'

// Components
import './components'

// Plugins
import './plugins'
import { sync } from 'vuex-router-sync'

import VuetifyDaterangePicker from 'vuetify-daterange-picker'
import 'vuetify-daterange-picker/dist/vuetify-daterange-picker.css'

// Application imports
import App from './App'
import router from '@/router'
import store from '@/store'
Vue.use(VuetifyDaterangePicker)

// Sync store with router
sync(store, router)

Vue.config.productionTip = false

Vue.use(CKEditor)

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
import { createPinia, PiniaVuePlugin } from 'pinia'
import JsonCSV from 'vue-json-csv';
import * as Style from './style/colors.js'

Vue.use(PiniaVuePlugin)
Vue.use(require('vue-shortkey'))
Vue.use(Style)

const pinia = createPinia()

Vue.config.productionTip = false
Vue.component('downloadCsv', JsonCSV);

new Vue({
  router,
  pinia,
  vuetify,
  render: function (h) { return h(App) }
}).$mount('#app')

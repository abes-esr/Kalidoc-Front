import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
import { createPinia, PiniaVuePlugin } from 'pinia'
import JsonCSV from 'vue-json-csv';
import VueMatomo from 'vue-matomo';

Vue.use(PiniaVuePlugin)
Vue.use(require('vue-shortkey'))

// utilisation de piwik/matomo uniquement en production
if(process.env.VUE_APP_ROOT_API.includes('qualimarc.sudoc')){
  Vue.use(VueMatomo, {
    host: "https://piwik.abes.fr/",
    siteId: 35,
    trackerFileName: 'matomo',
    router: router,
    enableLinkTracking: true,
    requireConsent: true,
    requireCookieConsent: true,
    trackInitialView: true,
    disableCookies: false,
    enableHeartBeatTimer: false,
    heartBeatTimerInterval: 15,
    debug: true,
    userId: undefined,
    cookieDomain: undefined,
    domains: undefined,
    preInitActions: []
  });
}

const pinia = createPinia()

Vue.config.productionTip = false
Vue.component('downloadCsv', JsonCSV);

new Vue({
  router,
  pinia,
  vuetify,
  render: function (h) { return h(App) }
}).$mount('#app')

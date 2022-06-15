import { createApp } from 'vue'
import App from './App.vue'
import { loadFonts } from './plugins/webfontloader'
import { createPinia } from 'pinia'

import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import {createVuetify} from "vuetify";

const vuetify = createVuetify({
    components,
    directives,
})
const app = createApp(App)

loadFonts()

app.use(vuetify).use(createPinia)
app.mount('#app')





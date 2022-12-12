import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import fr from 'vuetify/lib/locale/fr';
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify);

//TODO placer des couleurs globales pour factoriser
//Compatible uniquement avec vue3 pr la v2 -> https://vuetifyjs.com/en/features/theme/#customizing
export default new Vuetify({
    theme: {
      themes: {
        light: {
          primary: '#252c61',
          secondary: '#e6e6e6',
          tertiary: '#676c91',
          accent: '#c5471f',
          error: '#FF5252',
          info: '#525781',
          success: '#4CAF50',
          activated: '#cf4a1a',
          warning: '#cf4a1a',
          footer: '#000000',
        },
        mono: {
          primary: '#222222',
          secondary: '#989898',
          tertiary: '#444444',
          accent: '#333333',
          error: '#222222',
          info: '#767676',
          success: '#656565',
          activated: '#878787',
          warning: '#a9a9a9',
          footer: '#111111',
        },
        dark: {
          primary: '#252c61',
          secondary: '#e6e6e6',
          tertiary: '#676c91',
          accent: '#c5471f',
          error: '#FF5252',
          info: '#525781',
          success: '#4CAF50',
          activated: '#cf4a1a',
          warning: '#cf4a1a',
          footer: '#000000',
        },
      },
    },
    lang: {
      locales: { fr },
      current: 'fr',
    },
});

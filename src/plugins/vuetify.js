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
          primary: '#1976D2',
          secondary: '#424242',
          accent: '#82B1FF',
          error: '#FF5252',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FFC107',
        },
        dark: {
          primary: colors.red.darken1,
          secondary: colors.red.lighten4,
          accent: colors.indigo.base,
          error: '#b71c1c',
          info: '#b71c1c',
          success: '#b71c1c',
          warning: '#b71c1c',
          customized: colors.deepPurple.darken4,
        },
      },
    },
    lang: {
      locales: { fr },
      current: 'fr',
    },
});

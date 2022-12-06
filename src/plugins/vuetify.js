import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import fr from 'vuetify/lib/locale/fr';
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify);

//TODO placer des couleurs globales pour factoriser
//Compatible uniquement avec vue3
export default new Vuetify({
    theme: {
      defaultTheme: 'coral',
      themes: {
        light: {
          primary: '#3f51b5',
          secondary: '#b0bec5',
          accent: '#8c9eff',
          error: '#b71c1c',
          info: '#b71c1c',
          success: '#b71c1c',
          warning: '#b71c1c',
        },
        coral: {
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

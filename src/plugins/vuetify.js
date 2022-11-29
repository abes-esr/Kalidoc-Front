import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import fr from 'vuetify/lib/locale/fr';
import themeQualimarc from './theme';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        options: {
            customProperties: true,
        },
        themes: {
            themeQualimarc
        }
    },
    lang: {
      locales: { fr },
      current: 'fr',
    },
});

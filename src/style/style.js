export default {
    boderBlocColor() {
        console.log("boderBlocColor");
        return app.proxy.$vuetify.theme.dark ? 'border-color: ' + app.proxy.$vuetify.theme.themes.dark.borderbloc + ';' : 'border-color: ' + app.proxy.$vuetify.theme.themes.light.borderbloc + ';';
    }
}
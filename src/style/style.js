import vuetify from "@/plugins/vuetify";

export function boderBlocColor() {
    return vuetify.framework.theme.isDark ? 'border-color: ' + vuetify.userPreset.theme.themes.dark.borderbloc + ';' : 'border-color: ' + vuetify.userPreset.theme.themes.light.borderbloc + ';';
}

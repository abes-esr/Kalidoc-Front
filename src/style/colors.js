import vuetify from "@/plugins/vuetify";

export function borderBlocColor() {
    return vuetify.framework.theme.isDark ? 'border-color: ' + vuetify.userPreset.theme.themes.dark.borderbloc + ';' : 'border-color: ' + vuetify.userPreset.theme.themes.light.borderbloc + ';';
}

export function switchFromLightToMonoTheme() {
    vuetify.userPreset.theme.themes.light.primary = '#222222'
    vuetify.userPreset.theme.themes.light.secondary = '#989898'
    vuetify.userPreset.theme.themes.light.tertiary = '#444444'
    vuetify.userPreset.theme.themes.light.accent = '#333333'
    vuetify.userPreset.theme.themes.light.error = '#222222'
    vuetify.userPreset.theme.themes.light.info = '#767676'
    vuetify.userPreset.theme.themes.light.success = '#656565'
    vuetify.userPreset.theme.themes.light.activated = '#878787'
    vuetify.userPreset.theme.themes.light.warning = '#a9a9a9'
    vuetify.userPreset.theme.themes.light.footer = '#111111'
}

export function switchFromMonoToLightTheme() {
    vuetify.userPreset.theme.themes.light.primary = '#252c61'
    vuetify.userPreset.theme.themes.light.secondary = '#e6e6e6'
    vuetify.userPreset.theme.themes.light.tertiary = '#676c91'
    vuetify.userPreset.theme.themes.light.accent = '#c5471f'
    vuetify.userPreset.theme.themes.light.error = '#FF5252'
    vuetify.userPreset.theme.themes.light.info = '#525781'
    vuetify.userPreset.theme.themes.light.success = '#4CAF50'
    vuetify.userPreset.theme.themes.light.activated = '#cf4a1a'
    vuetify.userPreset.theme.themes.light.warning = '#cf4a1a'
    vuetify.userPreset.theme.themes.light.footer = '#000000'
}
import Vue from 'vue'
import Vuetify from 'vuetify'
import colors from 'vuetify/es5/util/colors'
import i18n from './i18n'

Vue.use(Vuetify)

export default new Vuetify({
  // Although `mdi` is the default value, make it explicit here to ensure that
  // the correct icon font is imported. Especially when configuring Storybook
  icons: { iconfont: 'mdi' },
  lang: {
    // As vue-i18n handles translation, `locales` and `current` are not
    // necessary anymore
    locales: {},
    current: '',
    // Let vue-i18n handle vuetify translations
    t: (key, ...params) => i18n.t(key, params) as string,
  },
  // Due to TypeScript usage, the theme has to be fully described, included the
  // `default`, `disable` and `options` fields
  theme: {
    dark: false,
    disable: false,
    default: false,
    options: {},
    themes: {
      light: {
        primary: colors.teal.lighten2,
        accent: colors.blueGrey.darken3,
        secondary: colors.pink.darken1,
        info: colors.blue.lighten2,
        warning: colors.amber.base,
        error: colors.red.accent4,
        success: colors.green.accent3,
      },
      dark: {
        primary: colors.teal.darken1,
        accent: colors.blueGrey.darken3,
        secondary: colors.pink.darken1,
        info: colors.blue.lighten1,
        warning: colors.amber.base,
        error: colors.red.accent4,
        success: colors.green.accent3,
      },
    },
  },
})

import Vue from "vue";
import Vuetify from "vuetify/lib";
import colors from "vuetify/es5/util/colors";

Vue.use(Vuetify);

export default new Vuetify({
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
        success: colors.green.accent3
      },
      dark: {
        primary: colors.teal.darken1,
        accent: colors.blueGrey.darken3,
        secondary: colors.pink.darken1,
        info: colors.blue.lighten1,
        warning: colors.amber.base,
        error: colors.red.accent4,
        success: colors.green.accent3
      }
    }
  }
});

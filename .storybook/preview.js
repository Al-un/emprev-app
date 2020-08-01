import { configure ,addDecorator} from "@storybook/vue";
import { withKnobs, boolean, select } from "@storybook/addon-knobs";

import i18n from "../src/plugins/i18n";
import vuetify from "../src/plugins/vuetify";
import "../src/plugins/composition";
import 'vuetify/dist/vuetify.min.css'

const i18nDecorator = () => ({
  // https://medium.com/studist-dev/internationalization-in-storybook-4be77773494c
  i18n,
  template: `<story />`,
  props: {
    storybookLocale: {
      type: String,
      default: select("I18n locale", ["en", "fr"], "en", "VuePlugins"),
    },
  },
  watch: {
    storybookLocale: {
      handler() {
        this.$i18n.locale = this.storybookLocale;
      },
      immediate: true,
    },
  },
  created() {
    // console.log(`=== i18n messages ===`, this.$i18n.messages)
  },
});

const vuetifyDecorator = () => ({
  // https://github.com/nidkil/vuetify-with-storybook/blob/master/config/storybook/config.js
  vuetify,
  template: "<v-app><story/></v-app>",
  props: {
    vuetifyDark: {
      type: Boolean,
      default: boolean("Vuetify Dark theme", false, "VuePlugins"),
    },
  },
  watch: {
    vuetifyDark: {
      handler() {
        this.$vuetify.theme.dark = this.vuetifyDark;
      },
      immediate: true,
    },
  },
});

addDecorator(withKnobs);
addDecorator(vuetifyDecorator);
addDecorator(i18nDecorator);
configure(require.context("../src/components/", true, /\.stories\.ts$/), module);

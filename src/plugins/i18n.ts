import Vue from 'vue'
import VueI18n from 'vue-i18n'
// use of relative path for Storybook preview.js
import messages, { LOCALE_DEFAULT } from '../i18n'

Vue.use(VueI18n)

export default new VueI18n({
  locale: process.env.VUE_APP_I18N_LOCALE || LOCALE_DEFAULT,
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || LOCALE_DEFAULT,
  messages,
})

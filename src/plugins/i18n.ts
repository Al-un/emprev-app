import Vue from 'vue'
import VueI18n from 'vue-i18n'
// use of relative path for Storybook preview.js
import messages, { LOCALE_DEFAULT } from '../i18n'

Vue.use(VueI18n)

// function loadLocaleMessages(): LocaleMessages {
//   const locales = require.context("./i18n", true, /[A-Za-z0-9-_,\s]+\.json$/i);
//   const messages: LocaleMessages = {};
//   locales.keys().forEach(key => {
//     const matched = key.match(/([A-Za-z0-9-_]+)\./i);
//     if (matched && matched.length > 1) {
//       const locale = matched[1];
//       messages[locale] = locales(key);
//     }
//   });
//   return messages;
// }

export default new VueI18n({
  locale: process.env.VUE_APP_I18N_LOCALE || LOCALE_DEFAULT,
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || LOCALE_DEFAULT,
  // messages: loadLocaleMessages()
  messages,
})

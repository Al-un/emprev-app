module.exports = {
  css: {
    loaderOptions: {
      // key changed from `sass` to `scss`
      // https://github.com/vuejs/vue-cli/issues/4526#issuecomment-537028918
      scss: {
        prependData: `@use "~@/styles/_includes.scss" as *;`
      }
    }
  },

  transpileDependencies: ['vuetify'],

  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'i18n',
      enableInSFC: false
    }
  }
}

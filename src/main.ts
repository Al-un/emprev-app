import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import i18n from './plugins/i18n'
import './plugins/composition'

Vue.config.productionTip = false

import BaseLoader from '@/components/ui/BaseLoader.vue'

Vue.component('base-loader', BaseLoader)

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App),
}).$mount('#app')

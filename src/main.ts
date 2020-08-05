// Vue ecosystem
import Vue from 'vue'
import router from './router'
import store from './store'
// Plugin
import vuetify from './plugins/vuetify'
import i18n from './plugins/i18n'
import './plugins/composition'
// Main view
import App from './App.vue'

Vue.config.productionTip = false

// Global components
import BaseLoader from '@/components/ui/BaseLoader.vue'
Vue.component('base-loader', BaseLoader)

// Initialisation
new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App),
}).$mount('#app')

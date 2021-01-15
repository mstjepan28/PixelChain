import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router'
import drizzleVuePlugin from '@drizzle/vue-plugin'
import drizzleOptions from './drizzleOptions'

Vue.use(Vuex);

const store = new Vuex.Store({});
Vue.config.productionTip = false

Vue.use(drizzleVuePlugin, {store, drizzleOptions})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

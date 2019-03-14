import Vue from 'vue'
import App from './App.vue'
import router from './router'

import VTooltip from 'v-tooltip'
Vue.use(VTooltip, {
  defaultDelay: 0,
  disposeTimeout: 0,
  defaultTrigger: 'click hover'
})

Vue.config.productionTip = false

Vue.prototype.$eventHub = new Vue(); // Global event bus

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')




router.beforeEach((to, from, next) => {

  if(to.meta.requiresAuth){
    const auth = sessionStorage.getItem('auth_id');
    if(auth != null){
      next();
    } else{
      next({name: 'login'});
    }

  } else{
    document.title = to.meta.title;
    next();
  }


})

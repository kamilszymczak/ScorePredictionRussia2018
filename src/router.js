import Vue from 'vue'
import Router from 'vue-router'
import Typowanie from './components/Typowanie.vue'
import Login from './components/Login.vue'
import Wyniki from './components/Wyniki.vue'
import Pomoc from './components/faq.vue'


Vue.use(Router)


export default new Router({
  routes: [
    {
      path: '/',
      name: 'typowanie',
      component: Typowanie,
      meta: { title: "Typwanie", requiresAuth: true }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { title: "Logowanie" }
    },
    {
      path: '/wyniki',
      name: 'wyniki',
      component: Wyniki,
      meta: { title: "WynikiPagT" }
    },
    {
      path: '/faq',
      name: 'Pomoc',
      component: Pomoc,
      meta: { title: "Pomoc" }
    }
  ],

})

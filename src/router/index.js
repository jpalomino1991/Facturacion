import Vue from 'vue'
import VueRouter from 'vue-router'
import ConsultaAnonima from '../views/ConsultaAnonima.vue'
import RegisterSuccessful from '../views/RegisterSuccessful.vue'
import ConfirmEmailOk from '../views/ConfirmEmailOk.vue'
import Login from '../views/Login.vue'
import store from '../store'
import Register from '../views/Register.vue'
import Recibo from '../views/Recibo.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'ConsultaAnonima',
    component: ConsultaAnonima
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/registersuccessful',
    name: 'RegisterSuccessful',
    component: RegisterSuccessful
  },
  {
    path: '/confirmemailok',
    name: 'ConfirmEmailOk',
    component: ConfirmEmailOk
  },
  {
    path: '/recibo',
    name: 'Recibo',
    component: Recibo,
    beforeEnter: (to, from, next) => {
      if(store.state.user.credentials.email)
        next();
      else
        next("/login");
    }
  }
]

const router = new VueRouter({
  mode: "history",
  routes
})

export default router

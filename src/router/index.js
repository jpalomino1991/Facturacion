import Vue from 'vue'
import VueRouter from 'vue-router'
import ConsultaAnonima from '../views/ConsultaAnonima.vue'
import Login from '../views/Login.vue'
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
    path: '/recibo',
    name: 'Recibo',
    component: Recibo
  }
]

const router = new VueRouter({
  mode: "history",
  routes
})

export default router

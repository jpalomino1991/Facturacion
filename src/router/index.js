import Vue from 'vue'
import VueRouter from 'vue-router'
import ConsultaAnonima from '../views/ConsultaAnonima.vue'
import ForgetPassword from '../views/ForgetPassword.vue'
import ForgetPasswordOk from '../views/ForgetPasswordOk.vue'
import RegisterSuccessful from '../views/RegisterSuccessful.vue'
import RecoverPassword from '../views/RecoverPassword.vue'
import RecoverPasswordOk from '../views/RecoverPasswordOk.vue'
import ConfirmEmailOk from '../views/ConfirmEmailOk.vue'
import RegisterOk from '../views/RegisterOk.vue'
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
    path: '/registerok/:token/:email',
    name: 'RegisterOk',
    component: RegisterOk
  },
  {
    path: '/recoverpass/:token/:email',
    name: 'RecoverPassword',
    component: RecoverPassword
  },
  {
    path: '/recoverpassok',
    name: 'RecoverPasswordOk',
    component: RecoverPasswordOk
  },
  {
    path: '/forgetpasswordok',
    name: 'ForgetPasswordOk',
    component: ForgetPasswordOk
  },
  {
    path: '/forgetpassword',
    name: 'ForgetPassword',
    component: ForgetPassword
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

import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  }, {
    path: '*',
    name: '404',
    component: () => import('../views/404'),
  }, {
    path: '/dev',
    name: 'dev',
    component: () => import('../views/Dev'),
  }, {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login'),
  }, {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('../views/Dashboard'),
  }, {
    path: '/user',
    name: 'user',
    component: () => import('../views/User'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router

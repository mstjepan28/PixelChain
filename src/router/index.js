import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Gallery',
    name: 'Gallery',
    component: () => import('../views/Gallery.vue')
  },
  {
    path: '/Artists',
    name: 'Artists',
    component: () => import('../views/Artists.vue')
  },
  {
    path: '/AboutUs',
    name: 'AboutUs',
    component: () => import('../views/AboutUs.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,

  scrollBehavior(){
    return { x: 0, y: 0 }
  }
})

export default router
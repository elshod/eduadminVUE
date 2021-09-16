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
    path: '/teachers',
    name: 'Teachers',
    component: () => import(/* webpackChunkName: "about" */ '../views/Teachers.vue')
  
  },
  {
    path: '/pupils',
    name: 'Pupils',
    component: () => import(/* webpackChunkName: "about" */ '../views/Pupil.vue')
  
  },
  {
    path: '/subjects',
    name: 'Subjects',
    component: () => import(/* webpackChunkName: "about" */ '../views/Subject.vue')
  },
  {
    path: '/pupil/:id',
    name: 'ViewPupil',
    component: () => import('../views/Pupil/View.vue')
  },
  {
    path: '/groups',
    name: 'Groups',
    component: () => import(/* webpackChunkName: "about" */ '../views/Group.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Accueil',
    component: Home
  },
  {
    path: '/liste',
    name: 'Liste',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Liste.vue')
  },
  {
    path: '/graphiques',
    name: 'Graphiques',
    component: () => import(/* webpackChunkName: "about" */ '../views/Graphiques.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

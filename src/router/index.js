import { createRouter, createWebHistory } from 'vue-router'
import BeaconView from '../views/BeaconView.vue'
import LoginView from '@/views/LoginView.vue'
import ProductList from '@/views/ProductList.vue'

const routes = [
  {
    path: '/',
    name: 'beacon',
    component: BeaconView
  },
  {
    path: '/main',
    name: 'main',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
    meta: { bgColor: "yellow" }
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: { bgColor: "green" }
  },
  {
    path: '/product-list',
    name: 'product-list',
    component: ProductList,
    meta: { bgColor: "orange" }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

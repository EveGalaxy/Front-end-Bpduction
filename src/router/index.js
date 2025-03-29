import { createRouter, createWebHistory } from 'vue-router'
import BeaconView from '../views/BeaconView.vue'
import LoginView from '@/views/LoginView.vue'
import ProductList from '@/views/ProductList.vue'
import SearchProduct from '@/views/SearchProduct.vue'
import SignUpView from '@/views/SignUpView.vue'

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
  },
  {
    path: '/search-product',
    name: 'search-product',
    component: SearchProduct,
    meta: { bgColor: "lightgreen" }
  },
  {
    path: '/sign-up',
    name: 'sign-up',
    component: SignUpView,
    meta: { bgColor: "lavender" }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

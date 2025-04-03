import { createRouter, createWebHistory } from 'vue-router'
import BeaconView from '../views/BeaconView.vue'
import LoginView from '@/views/LoginView.vue'
import ProductList from '@/views/ProductList.vue'
import SearchProduct from '@/views/SearchProduct.vue'
import SignUpView from '@/views/SignUpView.vue'
import CollectRssi from '@/views/CollectRssi.vue'

const routes = [
  {
    path: '/register_beacon',
    name: 'beacon',
    component: BeaconView
  },
  {
    path: '/collect_rssi',
    name: 'collect_rssi',
    component: CollectRssi
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('../views/AboutView.vue'),
    meta: { bgColor: "yellow" }
  },
  {
    path: '/',
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

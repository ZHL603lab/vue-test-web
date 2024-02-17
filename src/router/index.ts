import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const routes = [{
  path: '/',
  name: '首页',
  component: HomeView
}, {
  path: '/about',
  name: '关于',
  component: () => import('@/views/AboutView.vue')
}, {
  path: '/room/:id',
  name: '房间',
  component: () => import('@/views/RoomView.vue')
}, {
  path: '/bank',
  name: '题库',
  component: () => import('@/views/BankView.vue')
}, {
  path: '/user/login',
  name: '用户登录',
  component: () => import('@/views/user/LoginView.vue')
}, {
  path: '/user/signup',
  name: '用户注册',
  component: () => import('@/views/user/SignupView.vue')
}, {
  path: '/user/forget/:type',
  name: '用户忘记',
  component: () => import('@/views/user/ForgetView.vue')
}]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router

import { createRouter, createWebHistory } from 'vue-router'
import { routes } from '@/router/routes'
import setupUserInfoGuard from './guard/userInfoGuard'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

setupUserInfoGuard(router)

export default router

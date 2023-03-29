import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: '/',
    //   name: 'home',
    // },
    // {
    //   path: '/about',
    //   name: 'single',
    //   component: () => import('../components/SingleData.vue')
    // }
  ]
})

export default router

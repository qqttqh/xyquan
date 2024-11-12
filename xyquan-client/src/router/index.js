import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/Home.vue'),
      children: [
        {
          path: '',
          name: 'Recommend',
          component: () => import('@/components/home/Recommend.vue'),
        },
        {
          path: 'daily',
          name: 'Daily',
          component: () => import('@/components/home/Daily.vue'),
        },
        {
          path: 'confession-wall',
          name: 'ConfessionWall',
          component: () => import('@/components/home/ConfessionWall.vue'),
        },
        {
          path: 'lost-and-found',
          name: 'LostAndFound',
          component: () => import('@/components/home/LostAndFound.vue'),
        },
        {
          path: 'school-news',
          name: 'SchoolNews',
          component: () => import('@/components/home/SchoolNews.vue'),
        },
      ]
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('@/views/User.vue'),
      children: [
        {
          path: '',
          name: 'UserPost',
          component: () => import('@/components/user/UserPost.vue'),
        }
      ]
    }
  ]
})

export default router

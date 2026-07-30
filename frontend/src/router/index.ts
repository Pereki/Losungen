/**
 * router/index.ts
 *
 * Manual routes for ./src/pages/*.vue
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router'
import Index from '@/pages/index.vue'
import LitugicalDayView from '@/pages/LitugicalDayView.vue'
import LiturgicalDaysOverview from '@/pages/LiturgicalDaysOverview.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Index,
    },
    {
      path: '/liturgical-day/:date',
      component: LitugicalDayView,
    },
    {
      path: '/liturgical-days',
      component: LiturgicalDaysOverview,
    },
  ],
})

export default router

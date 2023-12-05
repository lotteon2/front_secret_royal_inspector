import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '@/layouts/MainLayout.vue'
import LoginLayout from '@/layouts/LoginLayout.vue'
import DashBoardView from '@/views/DashBoardView.vue'

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: DashBoardView,
    meta: {
      layout: MainLayout
    }
  },
  {
    path: '/login',
    name: 'loginLayout',
    component: () => import('@/layouts/LoginLayout.vue'),
    children: [
      {
        path: '',
        name: 'login',
        component: () => import('@/views/LoginView.vue'),
        meta: {
          title: 'login'
        }
      }
    ]
  },
  {
    path: '/',
    name: 'mainLayout',
    component: () => import('@/layouts/MainLayout.vue'),
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('@/views/DashBoardView.vue'),
        meta: {
          title: '대시보드'
        }
      },
      {
        path: '/live',
        name: 'live',
        component: () => import('@/views/Live/LiveListView.vue'),
        meta: {
          title: '라이브경매'
        }
      },
      {
        path: '/live/add',
        name: 'live/add',
        component: () => import('@/views/Live/LiveAddView.vue'),
        meta: {
          title: '라이브경매등록'
        }
      },
      {
        path: '/live/detail/:id',
        name: 'live/detail',
        component: () => import('@/views/Live/LiveDetailView.vue'),
        meta: {
          title: '라이브경매 상세 페이지'
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '@/layouts/MainLayout.vue'
import LoginLayout from '@/layouts/LoginLayout.vue'
import DashBoardView from '@/views/DashBoardView.vue'

const routes = [
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
        name: '',
        component: () => import('@/views/DashBoardView.vue'),
        meta: {
          title: '대시보드'
        }
      },
      {
        path: 'product',
        name: 'product',
        component: () => import('@/views/ProductView.vue'),
        meta: {
          title: '상품'
        }
      },
      {
        path: 'orderList',
        name: 'orderList',
        component: () => import('@/views/OrderListView.vue'),
        meta: {
          title: '상품'
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
  },
  {
    path: '/jumo',
    name: 'jumo',
    component: () => import('@/layouts/MainLayout.vue'),
    meta: {
      title: '주모 리스트'
    },
    children: [
      {
        path: '',
        index: true,
        name: 'jumoList',
        component: () => import('@/views/Jumo/JumoListView.vue'),
        meta: {
          title: '유저 리스트'
        }
      },
      {
        path: 'jumoDetail/:sellerId',
        name: 'jumoDetail',
        component: () => import('@/views/Jumo/JumoDetailView.vue'),
        props: true,
        meta: {
          title: '유저 디테일'
        },
        children: [
          {
            path: 'orderList',
            component: () => import('@/views/Jumo/JumoDetailOrderView.vue')
          },
          {
            path: 'cashup',
            component: () => import('@/views/Jumo/JumoDetailCashupView.vue')
          },
          {
            path: 'products',
            component: () => import('@/views/Jumo/JumoDetailProductsView.vue')
          }
        ]
      }
    ]
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('@/layouts/MainLayout.vue'),
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: '',
        index: true,
        name: 'userList',
        component: () => import('@/views/User/UserListView.vue'),
        meta: {
          title: '유저 리스트'
        }
      },
      {
        path: 'userDetail/:consumerId',
        name: 'userDetail',
        component: () => import('@/views/User/UserDetailView.vue'),
        meta: {
          title: '유저 디테일'
        },
        children: [
          {
            path: 'orderList',
            component: () => import('@/views/User/UserDetailOrderView.vue')
          },
          {
            path: 'point',
            component: () => import('@/views/User/UserDetailPointView.vue')
          },
          {
            path: 'credit',
            component: () => import('@/views/User/UserDetailCreditView.vue')
          },
          {
            path: 'auction',
            component: () => import('@/views/User/UserDetailAuctionView.vue')
          }
        ]
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

export const constantRoute = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/',
    component: () => import('@/views/layout/index.vue'),
    redirect: '/home',
    children: [
      {
        path: '/home',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: 'Home',
          device: ['PC', 'mobile'],
          icon: 'HomeFilled',
          group: 'menu'
        }
      },
      {
        path: '/category',
        component: () => import('@/views/category/index.vue'),
        meta: {
          title: 'Category',
          device: ['PC', 'mobile'],
          icon: 'Menu',
          group: 'menu'
        }
      },
      {
        path: '/questions',
        component: () => import('@/views/questions/index.vue'),
        meta: {
          title: 'Questions',
          device: ['PC', 'mobile'],
          icon: 'Management',
          group: 'menu'
        }
      },
      {
        path: '/questions/print',
        component: () => import('@/views/questions/PrintPreview.vue'),
        meta: {
          title: 'Print Preview',
          device: ['PC', 'mobile'],
          icon: '',
          group: ''
        }
      },
      {
        path: '/user',
        component: () => import('@/views/user/index.vue'),
        meta: {
          title: 'User',
          device: ['mobile'],
          icon: 'Avatar',
          group: 'menu'
        }
      }
    ]
  }
]

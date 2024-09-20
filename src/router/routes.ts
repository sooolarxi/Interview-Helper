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
      },
      {
        path: '/user/profile',
        component: () => import('@/views/user/UserProfile.vue'),
        meta: {
          title: 'User Profile',
          device: ['PC', 'mobile'],
          icon: 'User',
          group: 'user'
        }
      },
      {
        path: '/user/avatar',
        component: () => import('@/views/user/ChangeAvatar.vue'),
        meta: {
          title: 'Change Avatar',
          device: ['PC', 'mobile'],
          icon: 'Crop',
          group: 'user'
        }
      },
      {
        path: '/user/password',
        component: () => import('@/views/user/ResetPassword.vue'),
        meta: {
          title: 'Reset Password',
          device: ['PC', 'mobile'],
          icon: 'EditPen',
          group: 'user'
        }
      },
      {
        path: '/:pathMatch(.*)*',
        component: () => import('@/views/404/index.vue'),
        name: '404',
        meta: {
          title: 'Not Found',
          device: ['PC', 'mobile'],
          icon: '',
          group: ''
        }
      }
    ]
  }
]

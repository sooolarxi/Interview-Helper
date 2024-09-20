const metaInfo = {
  home: {
    title: 'Home',
    device: ['PC', 'mobile'],
    icon: 'HomeFilled',
    group: 'menu'
  },
  category: {
    title: 'Category',
    device: ['PC', 'mobile'],
    icon: 'Menu',
    group: 'menu'
  },
  questions: {
    title: 'Questions',
    device: ['PC', 'mobile'],
    icon: 'Management',
    group: 'menu'
  },
  questions_print: {
    title: 'Print Preview',
    device: ['PC', 'mobile'],
    icon: '',
    group: ''
  },
  user: {
    title: 'User',
    device: ['mobile'],
    icon: 'Avatar',
    group: 'menu'
  },
  user_profile: {
    title: 'User Profile',
    device: ['PC', 'mobile'],
    icon: 'User',
    group: 'user'
  },
  user_avatar: {
    title: 'Change Avatar',
    device: ['PC', 'mobile'],
    icon: 'Crop',
    group: 'user'
  },
  user_password: {
    title: 'Reset Password',
    device: ['PC', 'mobile'],
    icon: 'EditPen',
    group: 'user'
  },
  notfound: {
    title: 'Not Found',
    device: ['PC', 'mobile'],
    icon: '',
    group: ''
  }
}

export const constantRoute = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/layout',
    component: () => import('@/views/layout/index.vue'),
    redirect: '/home',
    children: [
      {
        path: '/home',
        component: () => import('@/views/home/index.vue'),
        meta: metaInfo.home
      },
      {
        path: '/category',
        component: () => import('@/views/category/index.vue'),
        meta: metaInfo.category
      },
      {
        path: '/questions',
        component: () => import('@/views/questions/index.vue'),
        meta: metaInfo.questions
      },
      {
        path: '/questions/print',
        component: () => import('@/views/questions/PrintPreview.vue'),
        meta: metaInfo.questions_print
      },
      {
        path: '/user',
        component: () => import('@/views/user/index.vue'),
        meta: metaInfo.user
      },
      {
        path: '/user/profile',
        component: () => import('@/views/user/UserProfile.vue'),
        meta: metaInfo.user_profile
      },
      {
        path: '/user/avatar',
        component: () => import('@/views/user/ChangeAvatar.vue'),
        meta: metaInfo.user_avatar
      },
      {
        path: '/user/password',
        component: () => import('@/views/user/ResetPassword.vue'),
        meta: metaInfo.user_password
      },
      {
        path: '/:pathMatch(.*)*',
        component: () => import('@/views/404/index.vue'),
        name: '404',
        meta: metaInfo.notfound
      }
    ]
  }
]

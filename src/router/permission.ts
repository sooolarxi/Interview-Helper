import { useDeviceStore, useUserStore } from '@/stores'
import router from '.'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false })
router.beforeEach((to: any, from: any, next: any) => {
  const deviceStore = useDeviceStore()
  const userStore = useUserStore()

  const isMobile = deviceStore.isMobile
  const token = userStore.token
  if (!isMobile) NProgress.start()
  if (!token && to.path !== '/login') {
    ElMessage.error('Please log in first!')
    next({ path: '/login' })
  } else if (token && to.path === '/login') {
    next({ path: '/' })
  } else {
    next()
  }
})

router.afterEach(() => {
  const deviceStore = useDeviceStore()

  const isMobile = deviceStore.isMobile
  if (!isMobile) NProgress.done()
})

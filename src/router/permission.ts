import router from '.'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false })

router.beforeEach(() => {
    NProgress.start()
  }
)

router.afterEach(() => {
  NProgress.done()
})

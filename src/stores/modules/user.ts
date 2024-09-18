import { catGetListService } from '@/api/category'
import { qGetListService } from '@/api/questions'
import type { qInfo } from '@/api/questions/type'
import { userGetInfoService, userLoginService } from '@/api/user'
import type { userInfo, userLoginRegForm } from '@/api/user/type'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore(
  'ih-user',
  () => {
    const token = ref('')

    const userLogin = async (data: userLoginRegForm) => {
      const res = await userLoginService(data)
      if (res.code === 0) {
        token.value = res.token as string
      } else {
        return Promise.reject()
      }
    }

    const user = ref<userInfo>()
    const userGetInfo = async () => {
      const res = await userGetInfoService()
      user.value = res.data
    }

    const totalCat = ref(0)
    const totalQ = ref(0)
    const totalRQ = ref(0)
    const totalUQ = ref(0)
    const getStatistic = async () => {
      totalRQ.value = 0
      totalUQ.value = 0
      const res1 = await catGetListService()
      totalCat.value = res1.data?.length as number
      const res2 = await qGetListService({ pagenum: 1, pagesize: 1000 })
      totalQ.value = res2.total as number
      ;(res2.data as qInfo[]).forEach((item) =>
        item.state === '已发布' ? totalRQ.value++ : totalUQ.value++
      )
    }

    return {
      token,
      userLogin,
      user,
      userGetInfo,
      totalCat,
      totalQ,
      totalRQ,
      totalUQ,
      getStatistic
    }
  },
  { persist: true }
)

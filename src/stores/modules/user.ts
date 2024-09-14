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

    return { token, userLogin, user, userGetInfo }
  },
  { persist: true }
)

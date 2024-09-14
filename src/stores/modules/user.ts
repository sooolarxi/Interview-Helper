import { userLoginService } from '@/api/user'
import { userLoginRegForm } from '@/api/user/type'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore(
  'ih-user',
  () => {
    const token = ref('')

    const userLogin = async (data: userLoginRegForm) => {
      const res = await userLoginService(data)
      if (res.code === 0) {
        token.value = res.token
      } else {
        return Promise.reject()
      }
    }

    return { token, userLogin }
  },
  { persist: true }
)

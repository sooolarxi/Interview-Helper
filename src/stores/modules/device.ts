import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useDeviceStore = defineStore('device', () => {
  const isMobile = ref(window.innerWidth < 768)
  let timer: number | null = null
  const checkDevice = () => {
    const loadingInstance = ElLoading.service()
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      isMobile.value = window.innerWidth < 768
      loadingInstance.close()
      timer = null
    }, 400)
  }
  return { isMobile, checkDevice }
})

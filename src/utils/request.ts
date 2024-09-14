import { useUserStore } from '@/stores/modules/user'
import axios from 'axios'

const baseURL = import.meta.env.VITE_APP_BASE_API
const request = axios.create({
  baseURL,
  timeout: 100000
})

request.interceptors.request.use((config) => {
  const userStore = useUserStore()
  if (userStore.token) {
    config.headers.Authorization = userStore.token
  }
  return config
})

request.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default request

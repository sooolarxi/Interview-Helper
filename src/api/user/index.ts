import request from '@/utils/request'
import type { userLoginRegForm, userLoginRegRes } from './type'

enum API {
  LOGIN_URL = '/api/login',
  REGISTER_URL = '/api/reg'
}

export const userLoginService = (data: userLoginRegForm) =>
  request.post<userLoginRegForm, userLoginRegRes>(API.LOGIN_URL, data)

export const userRegService = (data: userLoginRegForm) =>
  request.post<userLoginRegForm, userLoginRegRes>(API.REGISTER_URL, data)

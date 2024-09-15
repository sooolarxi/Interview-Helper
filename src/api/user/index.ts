import request from '@/utils/request'
import type {
  userGetInfoRes,
  userLoginRegForm,
  userLoginRegRes,
  userResData
} from './type'

enum API {
  LOGIN_URL = '/api/login',
  REGISTER_URL = '/api/reg',
  USERINFO_URL = '/my/userinfo'
}

export const userLoginService = (data: userLoginRegForm) =>
  request.post<userLoginRegForm, userLoginRegRes>(API.LOGIN_URL, data)

export const userRegService = (data: userLoginRegForm) =>
  request.post<userLoginRegForm, userResData>(API.REGISTER_URL, data)

export const userGetInfoService = () =>
  request.get<void, userGetInfoRes>(API.USERINFO_URL)

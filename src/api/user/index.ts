import request from '@/utils/request'
import type {
  userGetInfoRes,
  userInfo,
  userLoginRegForm,
  userLoginRegRes,
  userResData,
  userUpdatePwdForm
} from './type'

enum API {
  LOGIN_URL = '/api/login',
  REGISTER_URL = '/api/reg',
  USERINFO_URL = '/my/userinfo',
  UPDATEPWD_URL = '/my/updatepwd'
}

export const userLoginService = (data: userLoginRegForm) =>
  request.post<userLoginRegForm, userLoginRegRes>(API.LOGIN_URL, data)

export const userRegService = (data: userLoginRegForm) =>
  request.post<userLoginRegForm, userResData>(API.REGISTER_URL, data)

export const userGetInfoService = () =>
  request.get<void, userGetInfoRes>(API.USERINFO_URL)

export const userUpdateInfoService = (data: userInfo) =>
  request.put<void, userResData>(API.USERINFO_URL, data)

export const userUpdatePwdService = (data: userUpdatePwdForm) =>
  request.patch<void, userResData>(API.UPDATEPWD_URL, data)

export interface userResData {
  code: number
  message: string
}

export interface userLoginRegForm {
  username: string
  password: string
  repassword?: string
}

export interface userLoginRegRes extends userResData {
  token?: string
}

export interface userInfo {
  id: number
  username?: string
  nickname: string
  email: string
  user_pic?: string | null
}

export interface userGetInfoRes extends userResData {
  data?: userInfo
}

export interface userUpdatePwdForm {
  old_pwd: string
  new_pwd: string
  re_pwd: string
}

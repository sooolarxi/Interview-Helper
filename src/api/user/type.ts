export interface userLoginRegForm {
  username: string
  password: string
  repassword?: string
}

export interface userLoginRegRes {
  code: number
  message: string
  token?: string
}

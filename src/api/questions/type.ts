export interface qResData {
  status?: number
  code?: number
  message: string
}

export interface qGetListForm {
  pagenum: number
  pagesize: number
  cate_id?: string
  state?: string
}

export interface qListInfo {
  id: number
  title: string
  cate_name: string
  state: string | null
  pub_date: string
}

export interface qGetListRes extends qResData {
  data?: qListInfo[]
  total?: number
}

export interface qInfoForm {
  title: string
  content: string
  cate_id: number
  cover_img: File
  state: string
}

export type CombinedInfo = qListInfo &
  qInfoForm & {
    author_id: number
    username: string
    nickname: string
  }

export interface qGetInfoRes extends qResData {
  data?: CombinedInfo
}

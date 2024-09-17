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

export interface qGetListRes extends qResData {
  data?: qInfo[]
  total?: number
}

export interface qInfo {
  id?: string
  title: string
  content?: string
  cate_name?: string
  cate_id?: string
  cover_img?: File | string
  pub_date?: string
  state: string
  tagType?: string
  author_id?: number
  username?: string
  nickname?: string
}

export interface qGetInfoRes extends qResData {
  data?: qInfo
}

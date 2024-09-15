export interface catResData {
  code: number
  message: string
}

export interface catInfo {
  id?: number
  cate_name: string
  cate_alias: string
  isEdit?: boolean
}

export interface catGetListRes extends catResData {
  data?: catInfo[]
}

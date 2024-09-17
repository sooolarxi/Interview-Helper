import request from '@/utils/request'
import type { qGetInfoRes, qGetListForm, qGetListRes, qResData } from './type'

enum API {
  QLIST_URL = '/my/article/list',
  ADDQ_URL = '/my/article/add',
  QINFO_URL = '/my/article/info'
}

export const qGetListService = (data: qGetListForm) =>
  request.get<void, qGetListRes>(API.QLIST_URL, { params: data })

export const qAddInfoService = (data: FormData) =>
  request.post<void, qResData>(API.ADDQ_URL, data)

export const qGetInfoService = (id: string) =>
  request.get<void, qGetInfoRes>(API.QINFO_URL, { params: { id } })

export const qUpdateInfoService = (data: FormData) =>
  request.put<void, qResData>(API.QINFO_URL, data)

export const qDelInfoService = (id: string) =>
  request.delete<void, qResData>(API.QINFO_URL, { params: { id } })

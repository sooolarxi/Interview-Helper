import request from '@/utils/request'
import type {
  qGetInfoRes,
  qGetListForm,
  qGetListRes,
  qInfoForm,
  qResData
} from './type'

enum API {
  QLIST_URL = '/my/article/list',
  ADDQ_URL = '/my/article/add',
  QINFO_URL = '/my/article/info'
}

export const qGetListService = (data: qGetListForm) =>
  request.get<void, qGetListRes>(API.QLIST_URL, { params: data })

export const qAddInfoService = (data: qInfoForm) =>
  request.post<void, qResData>(API.QINFO_URL, data)

export const qGetInfoService = (id: number) =>
  request.get<void, qGetInfoRes>(API.QINFO_URL, { params: { id } })

export const qUpdateInfoService = (id: number, data: qInfoForm) =>
  request.put<void, qResData>(API.QINFO_URL + `/${id}`, data)

export const qDelInfoService = (id: number) =>
  request.delete<void, qResData>(API.QINFO_URL, { params: { id } })

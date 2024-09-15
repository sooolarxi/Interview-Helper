import request from '@/utils/request'
import type { catGetListRes, catInfo, catResData } from './type'

enum API {
  CATLIST_URL = '/my/cate/list',
  ADDCAT_URL = '/my/cate/add',
  UPDATECAT_URL = '/my/cate/info',
  DELCAT_URL = '/my/cate/del'
}

export const catGetListService = () =>
  request.get<void, catGetListRes>(API.CATLIST_URL)

export const catAddService = (data: catInfo) =>
  request.post<catInfo, catResData>(API.ADDCAT_URL, data)

export const catUpdateService = (data: catInfo) =>
  request.put<catInfo, catResData>(API.UPDATECAT_URL, data)

export const catDelService = (id: number) =>
  request.delete<void, catResData>(API.DELCAT_URL, { params: { id } })

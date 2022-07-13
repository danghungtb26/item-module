import { api_item_status } from '@apis/config'
import { handleRequest } from '@apis/handle'
import { ItemStatus } from '@models/item/status'
import { createSearchParams } from 'react-router-dom'

const getListItemStatus = (param?: BaseParam<Item.StatusQuery>) => {
  return handleRequest<Item.StatusInterface[]>(
    request =>
      request.get(
        `${api_item_status}?page=${param?.page ?? 1}&limit=${
          param?.limit ?? 10
        }&${createSearchParams(param?.input)}`
      ),
    r => ({
      data: r.data.data.rows.map(i => ItemStatus.fromJson(i)),
      page: {
        current: r.data.data.paging?.current_page ?? 1,
        max: r.data.data.paging.total_page ?? 1,
        count: r.data.data.paging.total ?? 0,
      },
    })
  )
}

const getItemStatus = (param: BaseParam) => {
  return handleRequest<Item.StatusInterface>(
    request => request.get(`${api_item_status}/${param.id}`),
    r => ({
      data: ItemStatus.fromJson(r.data.data),
    })
  )
}

const createItemStatus = (param: BaseParam<Item.StatusData>) => {
  return handleRequest<Item.StatusInterface>(
    request => request.post(`${api_item_status}`, param.input),
    r => ({
      data: ItemStatus.fromJson(r.data.data),
    })
  )
}

const updateItemStatus = (param: BaseParam<Item.StatusData>) => {
  return handleRequest<Item.StatusInterface>(
    request => request.put(`${api_item_status}/${param.id}`, param.input),
    r => ({
      data: ItemStatus.fromJson(r.data.data),
    })
  )
}

const deleteItemStatus = (param: BaseParam) => {
  return handleRequest<boolean>(
    request => request.delete(`${api_item_status}/${param.id}`),
    r => ({
      data: r.data.data,
    })
  )
}

const ItemStatusApi = {
  getListItemStatus,
  getItemStatus,
  createItemStatus,
  updateItemStatus,
  deleteItemStatus,
}

export default ItemStatusApi

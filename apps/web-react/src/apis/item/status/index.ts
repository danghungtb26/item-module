import { api_item_type } from '@apis/config'
import { handleRequest } from '@apis/handle'
import { ItemStatus } from '@models/item/status'

const getListItemStatus = (param?: BaseParam) => {
  return handleRequest<Item.StatusInterface[]>(
    request => request.get(`${api_item_type}?page=${param?.page ?? 1}&limit=${param?.limit ?? 10}`),
    r => ({
      data: r.data.data.map(i => ItemStatus.fromJson(i)),
    })
  )
}

const getItemStatus = (param: BaseParam) => {
  return handleRequest<Item.StatusInterface>(
    request => request.get(`${api_item_type}/${param.id}`),
    r => ({
      data: ItemStatus.fromJson(r.data.data),
    })
  )
}

const createItemStatus = (param: BaseParam<Item.StatusData>) => {
  return handleRequest<Item.StatusInterface>(
    request => request.post(`${api_item_type}`, param.input),
    r => ({
      data: ItemStatus.fromJson(r.data.data),
    })
  )
}

const updateItemStatus = (param: BaseParam<Item.StatusData>) => {
  return handleRequest<Item.StatusInterface>(
    request => request.put(`${api_item_type}/${param.id}`, param.input),
    r => ({
      data: ItemStatus.fromJson(r.data.data),
    })
  )
}

const deleteItemStatus = (param: BaseParam) => {
  return handleRequest<boolean>(
    request => request.delete(`${api_item_type}/${param.id}`),
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

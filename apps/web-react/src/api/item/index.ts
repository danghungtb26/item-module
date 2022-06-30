import { api_item_type } from '@api/config'
import { handleRequest } from '@api/handle'
import { BaseParam } from '@api/types'
import { ItemClass } from '@models/item'

const getListItem = (param?: BaseParam) => {
  return handleRequest<Item.Interface[]>(
    request => request.get(`${api_item_type}?page=${param?.page ?? 1}&limit=${param?.limit ?? 10}`),
    r => ({
      data: r.data.data.map(i => ItemClass.fromJson(i)),
    })
  )
}

const getItem = (param: BaseParam) => {
  return handleRequest<Item.Interface>(
    request => request.get(`${api_item_type}/${param.id}`),
    r => ({
      data: ItemClass.fromJson(r.data.data),
    })
  )
}

const createItem = (param: BaseParam<Item.Data>) => {
  return handleRequest<Item.Interface>(
    request => request.post(`${api_item_type}`, param.input),
    r => ({
      data: ItemClass.fromJson(r.data.data),
    })
  )
}

const updateItem = (param: BaseParam<Item.Data>) => {
  return handleRequest<Item.Interface>(
    request => request.put(`${api_item_type}/${param.id}`, param.input),
    r => ({
      data: ItemClass.fromJson(r.data.data),
    })
  )
}

const deleteItem = (param: BaseParam) => {
  return handleRequest<boolean>(
    request => request.delete(`${api_item_type}/${param.id}`),
    r => ({
      data: r.data.data,
    })
  )
}

const ItemApi = {
  getListItem,
  getItem,
  createItem,
  updateItem,
  deleteItem,
}

export default ItemApi

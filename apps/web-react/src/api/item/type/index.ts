import { api_item_type } from '@api/config'
import { handleRequest } from '@api/handle'
import { BaseParam } from '@api/types'
import { ItemType } from '@models/item/type'

const getListItemType = (param?: BaseParam) => {
  return handleRequest<Item.TypeInterface[]>(
    request => request.get(`${api_item_type}?page=${param?.page ?? 1}&limit=${param?.limit ?? 10}`),
    r => ({
      data: r.data.data.map(i => ItemType.fromJson(i)),
    })
  )
}

const getItemType = (param: BaseParam) => {
  return handleRequest<Item.TypeInterface>(
    request => request.get(`${api_item_type}/${param.id}`),
    r => ({
      data: ItemType.fromJson(r.data.data),
    })
  )
}

const createItemType = (param: BaseParam<Item.TypeData>) => {
  return handleRequest<Item.TypeInterface>(
    request => request.post(`${api_item_type}`, param.input),
    r => ({
      data: ItemType.fromJson(r.data.data),
    })
  )
}

const updateItemType = (param: BaseParam<Item.TypeData>) => {
  return handleRequest<Item.TypeInterface>(
    request => request.put(`${api_item_type}/${param.id}`, param.input),
    r => ({
      data: ItemType.fromJson(r.data.data),
    })
  )
}

const deleteItemType = (param: BaseParam) => {
  return handleRequest<boolean>(
    request => request.delete(`${api_item_type}/${param.id}`),
    r => ({
      data: r.data.data,
    })
  )
}

const ItemTypeApi = {
  getListItemType,
  getItemType,
  createItemType,
  updateItemType,
  deleteItemType,
}

export default ItemTypeApi

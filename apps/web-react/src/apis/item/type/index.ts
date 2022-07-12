import { api_item_type } from '@apis/config'
import { handleRequest } from '@apis/handle'
import { ItemType } from '@models/item/type'

const getListItemType = (param?: BaseParam<Item.TypeData>) => {
  const { input = {} } = param || {}
  const keys = Object.keys(input)
  const query = keys.reduce((a, b) => {
    return `${a}&${b}=${input[b]}`
  }, '')

  return handleRequest<Item.TypeInterface[]>(
    request =>
      request.get(`${api_item_type}?page=${param?.page ?? 1}&limit=${param?.limit ?? 10}${query}`),
    r => ({
      data: r.data.data.rows.map(i => ItemType.fromJson(i)),
      page: {
        current: r.data.data.paging?.current_page ?? 1,
        max: r.data.data.paging.total_page ?? 1,
        count: r.data.data.paging.total ?? 0,
      },
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

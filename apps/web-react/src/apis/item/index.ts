import { api_item_type } from '@apis/config'
import { handleRequest } from '@apis/handle'
import { ItemClass } from '@models/item'

const getListItem = (param?: BaseParam<Item.DataQuery>) => {
  return handleRequest<Item.Interface[]>(
    request =>
      request.get(
        `${api_item_type}?page=${param?.page ?? 1}&limit=${
          param?.limit ?? 10
        }&${new URLSearchParams(param?.input ?? {}).toString()}`
      ),
    r => ({
      data: r.data.data.rows.map(i => ItemClass.fromJson(i)),
      page: {
        current: r.data.data.paging?.current_page ?? 1,
        max: r.data.data.paging.total_page ?? 1,
        count: r.data.data.paging.total ?? 0,
      },
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

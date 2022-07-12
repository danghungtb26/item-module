import { api_item_attribute } from '@apis/config'
import { handleRequest } from '@apis/handle'
import { ItemAttribute } from '@models/item/attribute'

const getListItemAttribute = (param?: BaseParam) => {
  return handleRequest<Item.AttributeInterface[]>(
    request =>
      request.get(`${api_item_attribute}?page=${param?.page ?? 1}&limit=${param?.limit ?? 10}`),
    r => ({
      data: r.data.data.rows.map(i => ItemAttribute.fromJson(i)),
      page: {
        current: r.data.data.paging?.current_page ?? 1,
        max: r.data.data.paging.total_page ?? 1,
        count: r.data.data.paging.total ?? 0,
      },
    })
  )
}

const getItemAttribute = (param: BaseParam) => {
  return handleRequest<Item.AttributeInterface>(
    request => request.get(`${api_item_attribute}/${param.id}`),
    r => ({
      data: ItemAttribute.fromJson(r.data.data),
    })
  )
}

const createItemAttribute = (param: BaseParam<Item.AttributeData>) => {
  return handleRequest<Item.AttributeInterface>(
    request => request.post(`${api_item_attribute}`, param.input),
    r => ({
      data: ItemAttribute.fromJson(r.data.data),
    })
  )
}

// const updateItemAttribute = (param: BaseParam<Item.StatusData>) => {
//   return handleRequest<Item.AttributeInterface>(
//     request => request.put(`${api_item_attribute}/${param.id}`, param.input),
//     r => ({
//       data: ItemAttribute.fromJson(r.data.data),
//     })
//   )
// }

// const deleteItemAttribute = (param: BaseParam) => {
//   return handleRequest<boolean>(
//     request => request.delete(`${api_item_attribute}/${param.id}`),
//     r => ({
//       data: r.data.data,
//     })
//   )
// }

const ItemAttributeApi = {
  getListItemAttribute,
  getItemAttribute,
  createItemAttribute,
  //   updateItemAttribute,
  //   deleteItemAttribute,
}

export default ItemAttributeApi

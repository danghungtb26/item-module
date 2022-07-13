import { api_category } from '@apis/config'
import { handleRequest } from '@apis/handle'
import { Category } from '@models/category'
import { createSearchParams } from 'react-router-dom'

const getListCategory = (param?: BaseParam<CategoryQuery>) => {
  return handleRequest<CategoryInterface[]>(
    request =>
      request.get(
        `${api_category}?page=${param?.page ?? 1}&limit=${param?.limit ?? 10}&${createSearchParams(
          param?.input ?? {}
        )}`
      ),
    r => ({
      data: r.data.data.rows.map(i => Category.fromJson(i)),
      page: {
        current: r.data.data.paging?.current_page ?? 1,
        max: r.data.data.paging.total_page ?? 1,
        count: r.data.data.paging.total ?? 0,
      },
    })
  )
}

const getCategory = (param: BaseParam) => {
  return handleRequest<CategoryInterface>(
    request => request.get(`${api_category}/${param.id}`),
    r => ({
      data: Category.fromJson(r.data.data),
    })
  )
}

const createCategory = (param: BaseParam<CategoryData>) => {
  return handleRequest<CategoryInterface>(
    request => request.post(`${api_category}`, param.input),
    r => ({
      data: Category.fromJson(r.data.data),
    })
  )
}

const updateCategory = (param: BaseParam<CategoryData>) => {
  return handleRequest<CategoryInterface>(
    request => request.put(`${api_category}/${param.id}`, param.input),
    r => ({
      data: Category.fromJson(r.data.data),
    })
  )
}

const deleteCategory = (param: BaseParam) => {
  return handleRequest<boolean>(
    request => request.delete(`${api_category}/${param.id}`),
    r => ({
      data: r.data.data,
    })
  )
}

const CategoryApi = {
  getListCategory,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
}

export default CategoryApi

import type { CancelTokenSource } from 'axios'

export type BaseApiFunction<T = any, R = BaseResponse<any>> = (param: BaseParam<T>) => Promise<R>

export interface BaseResponse<T = any> {
  success?: boolean
  data?: T
  cancel?: boolean

  status: string | number

  message?: string
}

export type PBaseResponse<T = any> = Promise<BaseResponse<T>>

export interface BaseResponseList<T> {
  data: T[]
  paging: {
    next_page?: number
    current_link?: string
    next_link?: string
    current_page?: number
    total_page?: number
    limit?: number
    count?: number
  }
}

export interface BaseResponseServer<T> {
  data: T
  code: number
  message: string
}

export interface BaseParam<T = any> {
  id?: string | number

  authen?: string

  language?: string
  cancelToken?: CancelTokenSource
  input?: T
  page?: number
  limit?: number
}

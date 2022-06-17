declare global {
  namespace API {
    namespace V1 {
      interface Response<T extends any = any> {
        data: T
        paging?: {
          current_page: number
          limit: number
          total_page: number
          total: number
        }
      }
    }
  }
}

export {}

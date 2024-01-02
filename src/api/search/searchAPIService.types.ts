interface ApiResponse<T> {
  code: number
  message: string
  detail?: string
  data: T
  failure?: string
}

export interface Page<T> {
  content: T
  pageable: {
    sort: {
      empty: boolean
      sorted: boolean
      unsorted: boolean
    }
    offset: number
    pageSize: number
    pageNumber: number
    paged: boolean
    unpaged: boolean
  }
  last: boolean
  totalElements: number
  totalPages: number
  size: number
  number: number
  sort: {
    empty: boolean
    sorted: boolean
    unsorted: boolean
  }
  first: boolean
  numberOfElements: number
  empty: boolean
}

export type GetProductListBySellerIdResponseData = {
  productId: string
  productName: string
  totalSalesCount: number
  productPrice: number
  stockQuantity: number
  reviewCount: number
  shortsId: number
  isActivate: boolean
  sellerName?: string
}

export type GetProductListBySellerIdResponse = ApiResponse<
  Page<GetProductListBySellerIdResponseData[]>
>

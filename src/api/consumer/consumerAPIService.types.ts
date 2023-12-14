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

export type GetConsumerListResponseData = {
  consumerId: number
  thumbnail: string
  name: string
  email: string
  phoneNumber: string
  point: number
  credit: number
  isYangban: boolean
  createdAt: string
  isDeleted: boolean
}

export type GetConsumerInfoByConsumerIdResponseData = {
  consumerId: number
  thumbnail: string
  name: string
  email: string
  phoneNumber: string
  point: number
  credit: number
}

export type GetConsumerPointListByConsumerIdResponseData = {
  tradePath: keyof typeof POINT
  tradePoint: number
  tradeDate: string
}

export type GetConsumerListResponse = ApiResponse<Page<GetConsumerListResponseData[]>>

export type GetConsumerInfoByConsumerIdResponse =
  ApiResponse<GetConsumerInfoByConsumerIdResponseData>

export type GetConsumerPointListByConsumerIdResponse = ApiResponse<
  Page<GetConsumerPointListByConsumerIdResponseData[]>
>

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

export type GetSellerListParams = {
  page: number
  sort: string
  size: number
}

export type ApproveSellerParams = {
  sellerId: number
  approvalState: 'ALLOW' | 'DENY'
}

export type GetSellerListResponseData = {
  accessToken: string
}

export type GetSellerInfoResponseData = {
  sellerId: number
  email: string
  storeName: string
  storePhoneNumber: string
  storeImageUrl: string
}


export type GetSellerListResponse = ApiResponse<Page<GetSellerListResponseData[]>>

export type GetSellerInfoResponse = ApiResponse<GetSellerInfoResponseData>

export type ApproveSellerResponse = ApiResponse<string>;
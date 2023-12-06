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

export type RegisterAuctionParams = {
  title: string
  description: string
  startDate: string
}

export type GetAuctionListResponseData = {
  auctionId: string
  title: string
  description: string
  startDate: string
  endDate: string
  status: 'BEFORE' | 'ING' | 'AFTER'
  wait: number
  allow: number
  deny: number
}

export type GetAuctionDetailByAuctionIdResponseData = {
  auction: {
    auctionId: string
    title: string
    description: string
    startDate: string
    endDate: string
    status: 'BEFORE' | 'ING' | 'AFTER'
  }
  productList: AuctionProductType[]
}

export type AuctionProductType = {
  sellerId: number
  sellerName: string
  sellerEmail: string
  businessmanName: string
  storePhoneNumber: string
  storeImageUrl: string
  auctionProductId: string
  productName: string
  description: string
  startingPrice: number
  capacity: number
  alcoholDegree: number
  productImageUrl: string
  status: 'WAIT' | 'ALLOW' | 'DENY'
  createdAt: string
}

export type RegisterAuctionResponse = ApiResponse<string>
export type GetAuctionListResponse = ApiResponse<Page<GetAuctionListResponseData>>
export type GetAuctionDetailByAuctionIdResponse =
  ApiResponse<GetAuctionDetailByAuctionIdResponseData>

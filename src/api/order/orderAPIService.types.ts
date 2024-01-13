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

export type GetOrderListBySellerIdResponseData = {
  ordersId: string
  productId: string
  productName: string
  productCount: number
  productTotalAmount: number
  orderDate: string
  paymentType: string
  orderStatus: 'ORDER' | 'CANCEL' | 'SHIPPING' | 'COMPLETED' | 'CONFIRMED'
  deliveryId: number
  deliveryCode: string
  isAuction: boolean
  sellerName?: string
}

export type GetOrderListByConsumerIdResponseData = {
  ordersId: string
  productId: string
  productName: string
  productCount: number
  productTotalAmount: number
  orderDate: string
  paymentType: string
  orderStatus: 'ORDER' | 'CANCEL' | 'SHIPPING' | 'COMPLETED' | 'CONFIRMED'
  isAuction: boolean
}

export type GetCashUpListBySellerIdResponseData = {
  settlementYear: string
  settlementMonth: string
  totalAmount: number
  settlementCommision: number
  settlementAmount: number
  settlementImgUrl: string
}

type SellerRank = {
  sellerId: number
  sellerName: string
  totalPrice: number
}

type ProductRank = {
  sellerId: number
  sellerName: string
  productId: string
  productName: string
  totalCount: number
}

export type GetOrderForDashBoardResponseData = {
  totalSalesMonth: number
  commissionMonth: number
  monthSellerRank: {
    one: SellerRank
    two: SellerRank
    three: SellerRank
    four: SellerRank
    five: SellerRank
  }
  monthProductRank: {
    one: ProductRank
    two: ProductRank
    three: ProductRank
    four: ProductRank
    five: ProductRank
  }
}

export type GetOrderListBySellerIdResponse = ApiResponse<Page<GetOrderListBySellerIdResponseData[]>>

export type GetOrderListByConsumerIdResponse = ApiResponse<
  Page<GetOrderListByConsumerIdResponseData[]>
>

export type GetCashUpListBySellerIdResponse = ApiResponse<GetCashUpListBySellerIdResponseData[]>
export type GetOrderForDashBoardResponse = ApiResponse<GetOrderForDashBoardResponseData>

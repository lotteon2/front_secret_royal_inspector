interface ApiResponse<T> {
  code: number
  message: string
  detail?: string
  data: T
  failure?: string
}
export type LoginParams = {
  email: string
  password: string
}

export type LoginResponseData = {
  accessToken: string
}

export type GetDashBoardAuthResponseData = {
  waitingApprovalSellerCnts: number
  newSellerCnts: number
  newConsumerCnts: number
  deletedMemberCnts: number
  waitingApprovalAuctionCnts: number
}

export type LoginResponse = ApiResponse<LoginResponseData>
export type GetDashBoardAuthResponse = ApiResponse<GetDashBoardAuthResponseData>
export type GetDashBoardAgeResponse = ApiResponse<string>
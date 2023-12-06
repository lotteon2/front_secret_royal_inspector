interface ApiResponse<T> {
  code: number
  message: string
  detail?: string
  data: T
  failure?: string
}

export type UpdateProductVisibilityParams = {
  isActivate: boolean
}

export type UpdateShortsVisibilityParams = {
  isActivate: boolean
}

export type UpdateProductVisibilityResponse = ApiResponse<string>
export type UdpateShortsVisibilityResponse = ApiResponse<string>

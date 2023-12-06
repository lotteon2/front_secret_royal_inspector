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

export type LoginResponse = ApiResponse<LoginResponseData>

import { authAxiosInstance, defaultAxiosInstance } from '../utils'
import {
  type GetDashBoardAuthResponse,
  type LoginParams,
  type LoginResponse
} from './authAPIService.types'

export const localLogin = async (params: LoginParams) => {
  const { data } = await defaultAxiosInstance.post<LoginResponse>(
    '/authentication-service/api/sign-in',
    { ...params, memberRole: 'ROLE_ADMIN' }
  )
  return data
}

export const getDashBoardAuth = async () => {
  const { data } = await authAxiosInstance.get<GetDashBoardAuthResponse>(
    `authentication-service/api/admins/site-situation`
  )
  return data
}

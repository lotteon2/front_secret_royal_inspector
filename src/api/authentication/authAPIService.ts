import { defaultAxiosInstance } from '../utils'
import { type LoginParams, type LoginResponse } from './authAPIService.types'

export const localLogin = async (params: LoginParams) => {
  const { data } = await defaultAxiosInstance.post<LoginResponse>(
    '/authentication-service/api/sign-in',
    { ...params, memberRole: 'ROLE_ADMIN' }
  )
  return data
}

import { authAxiosInstance } from '../utils'
import type {
  UdpateShortsVisibilityResponse,
  UpdateProductVisibilityParams,
  UpdateProductVisibilityResponse,
  UpdateShortsVisibilityParams
} from './productAPIService.types'

export const updateProductVisibility = async (
  productId: string,
  params: UpdateProductVisibilityParams
) => {
  const { data } = await authAxiosInstance.patch<UpdateProductVisibilityResponse>(
    `/product-service/api/products/${productId}`,
    params
  )
  return data
}

export const UpdateShortsVisibility = async (
  shortsId: number,
  params: UpdateShortsVisibilityParams
) => {
  const { data } = await authAxiosInstance.patch<UdpateShortsVisibilityResponse>(
    `/product-service/api/shorts/${shortsId}`,
    params
  )
  return data
}

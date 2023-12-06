import { authAxiosInstance } from '../utils'
import type { GetProductListBySellerIdResponse } from './searchAPIService.types'

export const getProductListBySellerId = async (sellerId: number, page: number, size: number) => {
  const { data } = await authAxiosInstance.get<GetProductListBySellerIdResponse>(
    `/search-service/api/admin/sellers/${sellerId}/products?page=${page}&size=${size}`
  )
  return data
}

import { authAxiosInstance } from '../utils'
import type { GetOrderListBySellerIdResponse } from './orderAPIService.types'

export const getOrderListBySellerId = async (sellerId: number, page: number, size: number) => {
  const { data } = await authAxiosInstance.get<GetOrderListBySellerIdResponse>(
    `/order-service/api/order/seller/${sellerId}?page=${page}&size=${size}`
  )
  return data
}

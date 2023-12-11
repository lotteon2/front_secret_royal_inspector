import { authAxiosInstance } from '../utils'
import type {
  GetOrderListByConsumerIdResponse,
  GetOrderListBySellerIdResponse
} from './orderAPIService.types'

export const getOrderListBySellerId = async (sellerId: number, page: number, size: number) => {
  const { data } = await authAxiosInstance.get<GetOrderListBySellerIdResponse>(
    `/order-service/api/order/seller/${sellerId}?page=${page}&size=${size}`
  )
  return data
}

export const getOrderListByConsumerId = async (consumerId: number, page: number, size: number) => {
  const { data } = await authAxiosInstance.get<GetOrderListByConsumerIdResponse>(
    `/order-service/api/order/consumer/${consumerId}?page=${page}&size=${size}`
  )
  return data
}

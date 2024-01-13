import { authAxiosInstance } from '../utils'
import type {
  GetOrderListByConsumerIdResponse,
  GetOrderListBySellerIdResponse,
  GetCashUpListBySellerIdResponse,
  GetOrderForDashBoardResponse
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

export const getCashUpListBySellerId = async (sellerId: number, year: number) => {
  const { data } = await authAxiosInstance.get<GetCashUpListBySellerIdResponse>(
    `/order-service/api/settlement/seller/${sellerId}?year=${year}`
  )
  return data
}

export const getOrderForDashBoard = async (date: string) => {
  const { data } = await authAxiosInstance.get<GetOrderForDashBoardResponse>(
    `/order-service/api/admin/dashboard?date=${date}`
  )
  return data
}

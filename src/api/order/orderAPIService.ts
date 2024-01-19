import type { ORDER_STATE } from '@/types/ORDER'
import { authAxiosInstance } from '../utils'
import type {
  GetOrderListByConsumerIdResponse,
  GetOrderListBySellerIdResponse,
  GetCashUpListBySellerIdResponse,
  GetOrderForDashBoardResponse,
  getAllCashUpListForDashBoardResponse
} from './orderAPIService.types'

export const getOrderListBySellerId = async (sellerId: number, page: number, size: number, productStatus: keyof typeof ORDER_STATE | null) => {
  const { data } = await authAxiosInstance.get<GetOrderListBySellerIdResponse>(
  `/order-service/api/order/seller/${sellerId}?page=${page}&size=${size}&productStatus=${productStatus}&startDate=20240112&endDate=20240120`
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

export const getAllCashUpListForDashBoard= async (year: string, month: string) => {
  const { data } = await authAxiosInstance.get<getAllCashUpListForDashBoardResponse>(
    `order-service/api/all-seller-settlement?year=${year}&month=${month}`
  )
  return data
}
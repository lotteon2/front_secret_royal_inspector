import { authAxiosInstance } from '../utils'
import type {
  GetConsumerInfoByConsumerIdResponse,
  GetConsumerListResponse,
  GetConsumerPointListByConsumerIdResponse,
  GetCreditListByConsumerIdResponse
} from './consumerAPIService.types'

export const getConsumerList = async (page: number, size: number) => {
  const { data } = await authAxiosInstance.get<GetConsumerListResponse>(
    `/consumer-service/api/consumers-list?page=${page}&size=${size}`
  )
  return data
}

export const getConsumerDetailInfoByConsumerId = async (consumerId: number) => {
  const { data } = await authAxiosInstance.get<GetConsumerInfoByConsumerIdResponse>(
    `/consumer-service/api/consumers/${consumerId}`
  )
  return data
}

export const getConsumerPointListByConsumerId = async (
  consumerId: number,
  page: number,
  size: number
) => {
  const { data } = await authAxiosInstance.get<GetConsumerPointListByConsumerIdResponse>(
    `/consumer-service/api/consumers/${consumerId}/points?page=${page}&size=${size}`
  )
  return data
}

export const getCreditListByConsumerId = async (consumerId: number, page: number, size: number) => {
  const { data } = await authAxiosInstance.get<GetCreditListByConsumerIdResponse>(
    `/consumer-service/api/consumers/${consumerId}/credits?page=${page}&size=${size}`
  )
  return data
}
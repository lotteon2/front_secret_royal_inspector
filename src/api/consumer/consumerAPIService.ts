import { authAxiosInstance } from '../utils'
import type {
  GetConsumerInfoByConsumerIdResponse,
  GetConsumerListResponse
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

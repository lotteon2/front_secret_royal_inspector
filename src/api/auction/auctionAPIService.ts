import { authAxiosInstance } from '../utils'
import type {
  ApproveAuctionByAuctionProductIdResponse,
  DeleteAuctionResponse,
  FinishStreamResponse,
  GetAuctionDetailByAuctionIdResponse,
  GetAuctionListByConsumerIdResponse,
  GetAuctionListResponse,
  RegisterAuctionParams,
  RegisterAuctionResponse,
  StartStreamResponse,
  UpdateAskingPriceResponse,
  UpdateAuctionParams,
  UpdateAuctionResponse
} from './auctionAPIService.types'

export const registerAuction = async (params: RegisterAuctionParams) => {
  const { data } = await authAxiosInstance.post<RegisterAuctionResponse>(
    '/auction-service/api/auction',
    params
  )
  return data
}

export const getAuctionList = async (page: number, size: number) => {
  const { data } = await authAxiosInstance.get<GetAuctionListResponse>(
    `/auction-service/api/auction/admin?page=${page}&size=${size}`
  )
  return data
}

export const getAuctionDetailByAuctionId = async (
  auctionId: string,
  status: 'BEFORE' | 'ING' | 'AFTER'
) => {
  const { data } = await authAxiosInstance.get<GetAuctionDetailByAuctionIdResponse>(
    `/auction-service/api/auction/admin/detail/${auctionId}?status=${status}`
  )
  return data
}

export const approveAuctionByAuctionProductId = async (
  auctionProductId: string,
  confirm: 'ALLOW' | 'DENY'
) => {
  const { data } = await authAxiosInstance.patch<ApproveAuctionByAuctionProductIdResponse>(
    `/auction-service/api/auction/product/${auctionProductId}/confirm/${confirm}`
  )
  return data
}

export const updateAuction = async (auctionId: string, params: UpdateAuctionParams) => {
  const { data } = await authAxiosInstance.patch<UpdateAuctionResponse>(
    `/auction-service/api/auction/${auctionId}`,
    params
  )
  return data
}

export const deleteAuction = async (auctionId: string) => {
  const { data } = await authAxiosInstance.delete<DeleteAuctionResponse>(
    `/auction-service/api/auction/${auctionId}`
  )
  return data
}

export const startStream = async (auctionId: string) => {
  const { data } = await authAxiosInstance.post<StartStreamResponse>(
    `/auction-service/api/auction/streaming/${auctionId}`
  )
  return data
}

export const finishStream = async (auctionId: string) => {
  const { data } = await authAxiosInstance.patch<FinishStreamResponse>(
    `/auction-service/api/auction/streaming/${auctionId}`
  )
  return data
}

export const getAuctionListByConsumerId = async (
  consumerId: number,
  page: number,
  size: number
) => {
  const { data } = await authAxiosInstance.get<GetAuctionListByConsumerIdResponse>(
    `/auction-service/api/auction/bid/consumer/${consumerId}?page=${page}&size=${size}`
  )
  return data
}

export const updateAskingPrice = async (auctionId: string, askingPrice: number) => {
  const { data } = await authAxiosInstance.patch<UpdateAskingPriceResponse>(
    `/auction-service/api/auction/bid/askingPrice`,
    {
      auctionId,
      askingPrice
    }
  )
  return data
}

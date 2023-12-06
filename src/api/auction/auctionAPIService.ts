import { authAxiosInstance } from '../utils'
import type {
  ApproveAuctionByAuctionProductIdResponse,
  GetAuctionDetailByAuctionIdResponse,
  GetAuctionListResponse,
  RegisterAuctionParams,
  RegisterAuctionResponse
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
  confirm: 'CONFIRM' | 'DENY'
) => {
  const { data } = await authAxiosInstance.patch<ApproveAuctionByAuctionProductIdResponse>(
    `/auction-service/api/auction/product/${auctionProductId}/confirm/${confirm}`
  )
  return data
}

import { authAxiosInstance } from '../utils'
import type {
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

export const getAuctionDetailByAuctionId = async (auctionId: string) => {
  const { data } = await authAxiosInstance.get<GetAuctionDetailByAuctionIdResponse>(
    `/auction-service/api/auction/admin/detail/${auctionId}`
  )
}

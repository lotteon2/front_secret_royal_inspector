import { authAxiosInstance } from '../utils'
import type {
  ApproveSellerParams,
  ApproveSellerResponse,
  GetSellerInfoResponse,
  GetSellerListResponse
} from './sellerAPIService.types'

// TODO: 배포시 URl 변경
export const getSellerList = async (page: number, sort: string, size: number) => {
  const { data } = await authAxiosInstance.get<GetSellerListResponse>(
    `/seller-service/api/admin/sellers?page=${page}&sort=${sort}&size=${size}`
  )
  return data
}

export const getSellerInfoBySellerId = async (sellerId: number) => {
  const { data } = await authAxiosInstance.get<GetSellerInfoResponse>(
    `/seller-service/api/sellers/${sellerId}`
  )
  return data
}

export const approveSeller = async (params: ApproveSellerParams) => {
  const { data } = await authAxiosInstance.patch<ApproveSellerResponse>(
    `/seller-service/api/sellers/judge`,
    params
  )
  return data
}

import { authAxiosInstance } from '../utils'
import type {
  ApproveSellerParams,
  ApproveSellerResponse,
  GetSellerInfoResponse,
  GetSellerListResponse,
  WidthDrawSellerResponse
} from './sellerAPIService.types'

export const getSellerList = async (page: number, size: number) => {
  const { data } = await authAxiosInstance.get<GetSellerListResponse>(
    `/seller-service/api/admin/sellers?page=${page}&size=${size}`
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

export const withDrawSeller = async (sellerId: number) => {
  const { data } = await authAxiosInstance.delete<WidthDrawSellerResponse>(
    `/seller-service/api/sellers/${sellerId}`
  )
  return data
}

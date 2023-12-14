import axios, { type AxiosInstance } from 'axios'

const BASE_URL = import.meta.env.VITE_API_BASE_URL

// 기본 API 요청 처리
const axiosApi = (baseURL: string) => {
  return axios.create({
    baseURL,
    withCredentials: true,
    headers: {
      'Content-Type': `application/json;charset=UTF-8`,
      Accept: 'application/json',
      Authorization: localStorage.getItem('accessToken')
      // 'Access-Control-Allow-Origin': 'https://jeontongju-dev.shop/',
      // 'Access-Control-Allow-Credentials': 'true'
    }
  })
}
// 인증 요청
const axiosAuthApi = (baseURL: string) => {
  const instance: AxiosInstance = axios.create({
    baseURL
    // withCredentials: true2qq2q
  })

  instance.interceptors.request.use((config) => {
    config.headers.Authorization = `${localStorage.getItem('accessToken')}`
    return config
  })
  return instance
}

export const defaultAxiosInstance: AxiosInstance = axiosApi(BASE_URL)
export const authAxiosInstance: AxiosInstance = axiosAuthApi(BASE_URL)

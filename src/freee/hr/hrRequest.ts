import axios, { AxiosInstance } from "axios";
const HR_ENDPOINT = "https://api.freee.co.jp/hr/api/v1"

/**
 * freee 人事労務API へのリクエスト
 * @param token 
 * @param params 
 * @returns 
 */

export const hrRequest = (token: string, params?: any):AxiosInstance => {
  return axios.create({
    baseURL: HR_ENDPOINT,
    headers: {
      "Authorization": `Bearer ${token}`
    },
    params,
    responseType: "json"
  })
}

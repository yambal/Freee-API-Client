import { AxiosError, AxiosResponse } from 'axios'
import {baseGetMe} from './baseGetMe'
import { HrUser } from '../hrTypes'
import { ApiClientError } from '../../commonTypes'

/**
 * ログインユーザの取得
 * このリクエストの認可セッションにおけるログインユーザの情報を返します。
 * 人事労務freeeでは一人のログインユーザを複数の事業所に関連付けられるため、
 * このユーザと関連のあるすべての事業所の情報をリストで返します。
 * @param token 認証済みのAccessToken
 * @returns ユーザーの
 */
export const getMe = (token: string) => {
  return new Promise((resolve: (hrUser: HrUser) => void, reject) => {
    baseGetMe(token)
    .then((response: AxiosResponse) => {
      resolve(response.data)
    })
    .catch((axiosError: AxiosError) => {
      console.log(axiosError.response)
      const apiError: ApiClientError = {
        axiosMessage: axiosError.message,
        apiMessage: axiosError.response?.data.message
      }
      reject(apiError)
    })
  })
}
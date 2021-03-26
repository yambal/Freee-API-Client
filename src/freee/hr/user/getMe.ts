import { AxiosError, AxiosResponse } from 'axios'
import { HrUser } from '../hrTypes'
import { ApiClientError, V1_HrUri } from '../../commonTypes'
import { axiosErrorToApiClientError } from '../../axiosErrorToApiClientError'

import { hrRequest } from '../hrRequest'

const URI: V1_HrUri = '/users/me'

export const getMeBase = (token: string) => {
  return hrRequest(token).get(URI)
}

/**
 * ログインユーザの取得
 * このリクエストの認可セッションにおけるログインユーザの情報を返します。
 * 人事労務freeeでは一人のログインユーザを複数の事業所に関連付けられるため、
 * このユーザと関連のあるすべての事業所の情報をリストで返します。
 * @param token 認証済みのAccessToken
 * @returns ユーザーの
 */
export const getMe = (token: string): Promise<HrUser> => {
  return new Promise((resolve: (hrUser: HrUser) => void, reject) => {
    getMeBase(token)
    .then((response: AxiosResponse) => {
      resolve(response.data)
    })
    .catch((axiosError: AxiosError) => {
      console.log(axiosError.response)
      const apiError: ApiClientError = axiosErrorToApiClientError(axiosError, 'hr', URI, 'get')
      reject(apiError)
    })
  })
}
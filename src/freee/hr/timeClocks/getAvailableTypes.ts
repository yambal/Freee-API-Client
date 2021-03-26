import { hrRequest } from '../hrRequest'
import { ApiClientError, V1_HrUri } from '../../commonTypes'
import { AvailableTypes } from '../hrTypes'
import { AxiosError, AxiosResponse } from 'axios'
import { axiosErrorToApiClientError } from '../../axiosErrorToApiClientError'

/**
 * 指定した従業員・日付の打刻可能種別と打刻基準日を返します。
 * 例: すでに出勤した状態だと、休憩開始、退勤が配列で返ります。
 * @param token 
 * @param employee_id 
 * @returns 
 */

const URI: V1_HrUri = '/employees/{emp_id}/time_clocks/available_types'

export const getAvailableTypesBase = (token: string, company_id: number, employee_id:number) => {

  const uri = URI.replace('{emp_id}', `${employee_id}`)

  return hrRequest(token, {
    company_id
  }).get(uri)
}

export const getAvailableTypes = (token: string, company_id: number, employee_id: number): Promise<AvailableTypes> => {
  return new Promise((resolve: (types: AvailableTypes) => void, reject:(error: ApiClientError) => void) => {
    getAvailableTypesBase(token, company_id, employee_id)
    .then((response: AxiosResponse) => {
      resolve(response.data)
    })
    .catch((error: AxiosError) => {
      const apiError: ApiClientError = axiosErrorToApiClientError(error, 'hr', URI)
      reject(apiError)
    })
  })
}
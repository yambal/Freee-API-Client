import { AxiosError, AxiosResponse } from 'axios'
import { hrRequest } from '../hrRequest'
import { EmployeeTimeClock } from '../hrTypes'
import { ApiClientError, V1_HrUri } from '../../commonTypes'
import { axiosErrorToApiClientError } from '../../axiosErrorToApiClientError'
import { typeToTimeClockType } from '../../utilities/timeClockTypeUtilities'

const URI: V1_HrUri = '/employees/{emp_id}/time_clocks'

/**
 * 打刻情報の一覧取得
 * https://developer.freee.co.jp/docs/hr/reference#/%E3%82%BF%E3%82%A4%E3%83%A0%E3%83%AC%E3%82%B3%E3%83%BC%E3%83%80%E3%83%BC(%E6%89%93%E5%88%BB)/create
 * 指定した従業員・期間の打刻情報を返します。
 * デフォルトでは従業員の当月の打刻開始日から当日までの値が返ります。
 * @param token
 * @param company_id 
 * @param employee_id 
 * @param type 
 * @returns 
 */
/**
 * TODO: 他にオプションアリ
 */
export const getTimeClocksBase = (
  token: string,
  company_id: number,
  employee_id: number,
) => {
  const uri = URI.replace('{emp_id}', `${employee_id}`)

  return hrRequest(token, {
    company_id
  }).get(uri)
}

export const getTimeClocks = (
  token: string,
  company_id: number,
  employee_id: number,
): Promise<EmployeeTimeClock[]> => {
  return new Promise((resolve: (timeClocks: EmployeeTimeClock[]) => void, reject:(error: ApiClientError) => void) => {
    getTimeClocksBase(token, company_id, employee_id)
    .then((response: AxiosResponse) => {
      const timeClocks: EmployeeTimeClock[] = response.data.map((one: any) => {
        const timeClock: EmployeeTimeClock = {
          date: one.date,
          datetime: new Date(one.datetime),
          id: one.id,
          label: typeToTimeClockType(one.type)?.label,
          note: one.note,
          original_datetime: one.original_datetime,
          type: one.type
        }
        return timeClock
      })

      resolve(timeClocks)
    })
    .catch((axiosError: AxiosError) => {
      const apiError: ApiClientError = axiosErrorToApiClientError(axiosError, 'hr', URI, 'get')
      reject(apiError)
    })
  })
}
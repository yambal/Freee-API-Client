import { AxiosError, AxiosResponse } from 'axios'
import { hrRequest } from '../hrRequest'
import { TimeClockType, EmployeeTimeClock } from '../hrTypes'
import {
  getDateString,
  getDateTimeString
} from '../../utilities/dateUtility'
import { ApiClientError, V1_HrUri } from '../../commonTypes'
import { axiosErrorToApiClientError } from '../../axiosErrorToApiClientError'
import { typeToTimeClockType } from '../../utilities/timeClockTypeUtilities'

const URI: V1_HrUri = '/employees/{emp_id}/time_clocks'

/**
 * 打刻情報の登録
 * https://developer.freee.co.jp/docs/hr/reference#/%E3%82%BF%E3%82%A4%E3%83%A0%E3%83%AC%E3%82%B3%E3%83%BC%E3%83%80%E3%83%BC(%E6%89%93%E5%88%BB)/create
 * 指定した従業員の打刻情報を登録します。
 * 休憩開始の連続や退勤のみなど、整合性の取れていない打刻は登録できません。
 * 退勤の打刻は、すでに登録されている退勤打刻よりも後の時刻であれば上書き登録することができます。
 * 打刻可能種別の取得APIを呼ぶことで、その従業員がその時点で登録可能な打刻種別が取得できます。
 * 打刻が日をまたぐ場合は、base_date(打刻日)に前日の日付を指定してください。
 * datetime(打刻日時)を指定できるのは管理者か事務担当者の権限を持ったユーザのみです。
 * @param token
 * @param company_id 
 * @param employee_id 
 * @param type 
 * @returns 
 */
export const postTimeClocksBase = (
  token: string,
  company_id: number,
  employee_id: number,
  type: TimeClockType,
  base_date: Date,
  datetime?: Date
) => {

  const base_date_string = getDateString(base_date)
  const datetime_string = datetime ? getDateTimeString(datetime) : null
  
  const uri = URI.replace('{emp_id}', `${employee_id}`)

  return hrRequest(token).post(uri, {
    company_id,
    type,
    "base_date": base_date_string,
    "datetime": datetime_string
  })
}

export const postTimeClocks = (
  token: string,
  company_id: number,
  employee_id: number,
  type: TimeClockType,
  base_date: Date,
  datetime?: Date
): Promise<EmployeeTimeClock> => {
  return new Promise((resolve: (timeClock: EmployeeTimeClock) => void, reject:(error: ApiClientError) => void) => {
    postTimeClocksBase(token, company_id, employee_id, type, base_date, datetime)
    .then((response: AxiosResponse) => {
      const employee_time_clock: EmployeeTimeClock = response.data.employee_time_clock
      const typeWithLabel = typeToTimeClockType(employee_time_clock.type)
      const label = typeWithLabel ? typeWithLabel.label : undefined

      console.log(`response.data: ${JSON.stringify(employee_time_clock, null, 2)}`)
      console.log(`response.data.datetime: ${employee_time_clock.datetime}`)
      console.log(`response.data.original_datetime: ${employee_time_clock.original_datetime}`)

      const timeClock: EmployeeTimeClock = {
        date: employee_time_clock.date,
        datetime: new Date(employee_time_clock.datetime),
        id: employee_time_clock.id,
        label,
        note: employee_time_clock.note,
        original_datetime: new Date(employee_time_clock.original_datetime),
        type: employee_time_clock.type
      }
      resolve(timeClock)
    })
    .catch((axiosError: AxiosError) => {
      const apiError: ApiClientError = axiosErrorToApiClientError(axiosError, 'hr', URI, 'post')
      reject(apiError)
    })
  })
}
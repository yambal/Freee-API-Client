import { hrRequest } from '../hrRequest'
import { ApiClientError, V1_HrUri } from '../../commonTypes'
import { AvailableTypes, TimeClockType, TimeClockTypeLabel, TimeClockTypeWithLabel } from '../hrTypes'
import { AxiosError, AxiosResponse } from 'axios'
import { axiosErrorToApiClientError } from '../../axiosErrorToApiClientError'

const URI: V1_HrUri = '/employees/{emp_id}/time_clocks/available_types'

/**
 * 
 * @param token 
 * @param company_id 
 * @param employee_id 
 * @returns 
 */
export const getAvailableTypesBase = (token: string, company_id: number, employee_id:number) => {

  const uri = URI.replace('{emp_id}', `${employee_id}`)

  return hrRequest(token, {
    company_id
  }).get(uri)
}

const typeToLabel = (type: TimeClockType):TimeClockTypeLabel| undefined => {
  switch(type){
    case 'clock_in':
      return '出勤'
    case 'break_begin':
      return '休憩開始'
    case 'break_end':
      return '休憩終了'
    case 'clock_out':
      return '退勤'
    default:
      return undefined
  }
}

const typeToTimeClockType = (type: TimeClockType): TimeClockTypeWithLabel | undefined => {
  const label = typeToLabel(type)
  if(label){
    return {
      type,
      label
    }
  }
  return undefined
}

export const getAvailableTypes = (token: string, company_id: number, employee_id: number): Promise<AvailableTypes> => {
  return new Promise((resolve: (types: AvailableTypes) => void, reject:(error: ApiClientError) => void) => {
    getAvailableTypesBase(token, company_id, employee_id)
    .then((response: AxiosResponse) => {
      const types: TimeClockType[] = response.data.available_types

      let available_types: TimeClockTypeWithLabel[] = []

      types.forEach((type) => {
        const withType = typeToTimeClockType(type)
        if(withType) {
          available_types.push(withType)
        } 
      })

      const base_date:Date = new Date(response.data.base_date)
      resolve({
        base_date,
        available_types
      })
    })
    .catch((error: AxiosError) => {
      const apiError: ApiClientError = axiosErrorToApiClientError(error, 'hr', URI)
      reject(apiError)
    })
  })
}
import { hrRequest } from '../hrRequest'
import { ApiClientError, V1_HrUri } from '../../commonTypes'
import { AvailableTypes, TimeClockType, TimeClockTypeWithLabel } from '../hrTypes'
import { AxiosError, AxiosResponse } from 'axios'
import { axiosErrorToApiClientError } from '../../axiosErrorToApiClientError'
import { typeToTimeClockType } from '../../utilities/timeClockTypeUtilities'

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
      const apiError: ApiClientError = axiosErrorToApiClientError(error, 'hr', URI, 'get')
      reject(apiError)
    })
  })
}
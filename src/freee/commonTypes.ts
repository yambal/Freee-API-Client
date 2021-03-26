
export type ApiClientErrorStatusCode = number|undefined
export type ApiClientErrorStatusMessage = string|undefined
export type ApiClientErrorApiMessage = string|undefined
export type ApiClientErrorAxiosMessage = string|undefined

export type ApiClientError = {
  statusCode: ApiClientErrorStatusCode
  statusMessage: ApiClientErrorStatusMessage
  axiosMessage: ApiClientErrorAxiosMessage
  apiMessage: ApiClientErrorApiMessage
  errorCode: string
}

export type V1_HrUri = '/users/me'
| '/employees/{emp_id}/time_clocks'
| '/employees/{emp_id}/time_clocks/available_types'
import { AxiosError } from 'axios'
import {
  ApiClientError,
  ApiClientErrorStatusCode,
  ApiClientErrorStatusMessage,
  ApiClientErrorApiMessage,
  V1_HrUri
} from './commonTypes'

export const axiosErrorToApiClientError = (axiosError: AxiosError, apiName: 'hr', uri: V1_HrUri):ApiClientError => {
  const statusCode: ApiClientErrorStatusCode = axiosError.response ? axiosError.response.status : undefined
  let statusMessage :ApiClientErrorStatusMessage
  let errorCode: string
  switch (statusCode) {
    case 400:
      statusMessage = "リクエストパラメータが不正"
      errorCode = `${apiName}${uri}-400`
      break;
    case 401:
      statusMessage = "アクセストークンが無効"
      errorCode = `${apiName}${uri}-401`
      break;
    case 403:
      statusMessage = "アクセス権限がない"
      errorCode = `${apiName}${uri}-403`
      break;
    case 404:
      statusMessage = "リソースが存在しない"
      errorCode = `${apiName}${uri}-404`
      break;
    case 429:
      statusMessage = "リクエスト回数制限を越えた"
      errorCode = `${apiName}${uri}-429`
      break;
    case 503:
      statusMessage = "システム内で予期しないエラーが発生"
      errorCode = `${apiName}${uri}-503`
      break;
    case NaN:
      statusMessage = undefined
      errorCode = `${apiName}${uri}-unknown`
      break;
    default:
      statusMessage = `status: ${statusCode}`
      errorCode = `${apiName}${uri}-${statusCode}`
  }

  const apiMessage: ApiClientErrorApiMessage = axiosError.response ? axiosError.response.data : undefined
  const axiosMessage: string = axiosError.message

  return {
    statusCode,
    statusMessage,
    axiosMessage,
    apiMessage,
    errorCode
  }
}
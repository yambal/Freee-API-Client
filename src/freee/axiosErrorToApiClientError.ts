import { AxiosError } from 'axios'
import {
  ApiClientError,
  ApiClientErrorStatusCode,
  ApiClientErrorStatusMessage,
  ApiClientErrorApiMessage,
  ApiClientErrorAxiosMessage,
  V1_HrUri
} from './commonTypes'

export const axiosErrorToApiClientError = (axiosError: AxiosError, apiName: 'hr', uri: V1_HrUri, method: 'get' | 'post'):ApiClientError => {
  const statusCode: ApiClientErrorStatusCode = axiosError.response ? axiosError.response.status : undefined
  let statusMessage :ApiClientErrorStatusMessage
  switch (statusCode) {
    case 400:
      statusMessage = "リクエストパラメータが不正"
      break;
    case 401:
      statusMessage = "アクセストークンが無効"
      break;
    case 403:
      statusMessage = "アクセス権限がない"
      break;
    case 404:
      statusMessage = "リソースが存在しない"
      break;
    case 429:
      statusMessage = "リクエスト回数制限を越えた"
      break;
    case 503:
      break;
    case NaN:
      statusMessage = undefined
      break;
    default:
      statusMessage = `status: ${statusCode}`
  }

  const apiMessage: ApiClientErrorApiMessage = axiosError.response ? axiosError.response.data : undefined
  const axiosMessage: ApiClientErrorAxiosMessage = axiosError.message

  return {
    statusCode,
    statusMessage,
    axiosMessage,
    apiMessage,
    errorApi: apiName,
    uri,
    method,
    extends: undefined
  }
}
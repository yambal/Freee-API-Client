import { AxiosError } from 'axios';
import { ApiClientError, V1_HrUri } from './commonTypes';
export declare const axiosErrorToApiClientError: (axiosError: AxiosError, apiName: 'hr', uri: V1_HrUri) => ApiClientError;

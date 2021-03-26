export declare type ApiClientErrorStatusCode = number | undefined;
export declare type ApiClientErrorStatusMessage = string | undefined;
export declare type ApiClientErrorApiMessage = string | undefined;
export declare type ApiClientErrorAxiosMessage = string | undefined;
export declare type ApiClientError = {
    statusCode: ApiClientErrorStatusCode;
    statusMessage: ApiClientErrorStatusMessage;
    axiosMessage: ApiClientErrorAxiosMessage;
    apiMessage: ApiClientErrorApiMessage;
    errorApi: 'freee' | 'hr' | undefined;
    uri: V1_HrUri | undefined;
    method: 'get' | 'post' | undefined;
    extends: any | undefined;
};
export declare type V1_HrUri = '/users/me' | '/employees/{emp_id}/time_clocks' | '/employees/{emp_id}/time_clocks/available_types';

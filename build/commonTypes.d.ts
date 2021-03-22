export declare type ApiClientErrorStatusCode = number | undefined;
export declare type ApiClientErrorStatusMessage = string | undefined;
export declare type ApiClientErrorApiMessage = string | undefined;
export declare type ApiClientErrorAxiosMessage = string | undefined;
export declare type ApiClientError = {
    statusCode: ApiClientErrorStatusCode;
    statusMessage: ApiClientErrorStatusMessage;
    axiosMessage: ApiClientErrorAxiosMessage;
    apiMessage: ApiClientErrorApiMessage;
    errorCode: string;
};
export declare type V1_HrUri = '/users/me';

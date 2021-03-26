"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.axiosErrorToApiClientError = void 0;
const axiosErrorToApiClientError = (axiosError, apiName, uri, method) => {
    const statusCode = axiosError.response ? axiosError.response.status : undefined;
    let statusMessage;
    switch (statusCode) {
        case 400:
            statusMessage = "リクエストパラメータが不正";
            break;
        case 401:
            statusMessage = "アクセストークンが無効";
            break;
        case 403:
            statusMessage = "アクセス権限がない";
            break;
        case 404:
            statusMessage = "リソースが存在しない";
            break;
        case 429:
            statusMessage = "リクエスト回数制限を越えた";
            break;
        case 503:
            break;
        case NaN:
            statusMessage = undefined;
            break;
        default:
            statusMessage = `status: ${statusCode}`;
    }
    const apiMessage = axiosError.response ? axiosError.response.data : undefined;
    const axiosMessage = axiosError.message;
    return {
        statusCode,
        statusMessage,
        axiosMessage,
        apiMessage,
        errorApi: apiName,
        uri,
        method,
        extends: undefined
    };
};
exports.axiosErrorToApiClientError = axiosErrorToApiClientError;

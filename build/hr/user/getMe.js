"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMe = exports.getMeBase = void 0;
const axiosErrorToApiClientError_1 = require("../../axiosErrorToApiClientError");
const hrRequest_1 = require("../hrRequest");
const URI = '/users/me';
const getMeBase = (token) => {
    return hrRequest_1.hrRequest(token).get(URI);
};
exports.getMeBase = getMeBase;
/**
 * ログインユーザの取得
 * このリクエストの認可セッションにおけるログインユーザの情報を返します。
 * 人事労務freeeでは一人のログインユーザを複数の事業所に関連付けられるため、
 * このユーザと関連のあるすべての事業所の情報をリストで返します。
 * @param token 認証済みのAccessToken
 * @returns ユーザーの
 */
const getMe = (token) => {
    return new Promise((resolve, reject) => {
        exports.getMeBase(token)
            .then((response) => {
            resolve(response.data);
        })
            .catch((axiosError) => {
            console.log(axiosError.response);
            const apiError = axiosErrorToApiClientError_1.axiosErrorToApiClientError(axiosError, 'hr', URI);
            reject(apiError);
        });
    });
};
exports.getMe = getMe;

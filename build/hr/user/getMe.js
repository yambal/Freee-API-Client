"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMe = void 0;
const baseGetMe_1 = require("./baseGetMe");
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
        baseGetMe_1.baseGetMe(token)
            .then((response) => {
            resolve(response.data);
        })
            .catch((axiosError) => {
            console.log(axiosError.response);
            const apiError = {
                axiosMessage: axiosError.message,
                apiMessage: axiosError.response?.data.message
            };
            reject(apiError);
        });
    });
};
exports.getMe = getMe;

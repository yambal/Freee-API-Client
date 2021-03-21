"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hrRequest = void 0;
const axios_1 = require("axios");
const HR_ENDPOINT = "https://api.freee.co.jp/hr/api/v1";
/**
 * freee 人事労務API へのリクエスト
 * @param token
 * @param params
 * @returns
 */
const hrRequest = (token, params) => {
    return axios_1.default.create({
        baseURL: HR_ENDPOINT,
        headers: {
            "Authorization": `Bearer ${token}`
        },
        params,
        responseType: "json"
    });
};
exports.hrRequest = hrRequest;

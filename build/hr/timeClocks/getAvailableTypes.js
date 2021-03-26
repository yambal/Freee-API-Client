"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAvailableTypes = exports.getAvailableTypesBase = void 0;
const hrRequest_1 = require("../hrRequest");
const axiosErrorToApiClientError_1 = require("../../axiosErrorToApiClientError");
/**
 * 指定した従業員・日付の打刻可能種別と打刻基準日を返します。
 * 例: すでに出勤した状態だと、休憩開始、退勤が配列で返ります。
 * @param token
 * @param employee_id
 * @returns
 */
const URI = '/employees/{emp_id}/time_clocks/available_types';
const getAvailableTypesBase = (token, company_id, employee_id) => {
    const uri = URI.replace('{emp_id}', `${employee_id}`);
    return hrRequest_1.hrRequest(token, {
        company_id
    }).get(uri);
};
exports.getAvailableTypesBase = getAvailableTypesBase;
const getAvailableTypes = (token, company_id, employee_id) => {
    return new Promise((resolve, reject) => {
        exports.getAvailableTypesBase(token, company_id, employee_id)
            .then((response) => {
            resolve(response.data);
        })
            .catch((error) => {
            const apiError = axiosErrorToApiClientError_1.axiosErrorToApiClientError(error, 'hr', URI);
            reject(apiError);
        });
    });
};
exports.getAvailableTypes = getAvailableTypes;

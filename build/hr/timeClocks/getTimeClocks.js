"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTimeClocks = exports.getTimeClocksBase = void 0;
const hrRequest_1 = require("../hrRequest");
const axiosErrorToApiClientError_1 = require("../../axiosErrorToApiClientError");
const timeClockTypeUtilities_1 = require("../../utilities/timeClockTypeUtilities");
const URI = '/employees/{emp_id}/time_clocks';
/**
 * 打刻情報の一覧取得
 * https://developer.freee.co.jp/docs/hr/reference#/%E3%82%BF%E3%82%A4%E3%83%A0%E3%83%AC%E3%82%B3%E3%83%BC%E3%83%80%E3%83%BC(%E6%89%93%E5%88%BB)/create
 * 指定した従業員・期間の打刻情報を返します。
 * デフォルトでは従業員の当月の打刻開始日から当日までの値が返ります。
 * @param token
 * @param company_id
 * @param employee_id
 * @param type
 * @returns
 */
/**
 * TODO: 他にオプションアリ
 */
const getTimeClocksBase = (token, company_id, employee_id) => {
    const uri = URI.replace('{emp_id}', `${employee_id}`);
    return hrRequest_1.hrRequest(token, {
        company_id
    }).get(uri);
};
exports.getTimeClocksBase = getTimeClocksBase;
const getTimeClocks = (token, company_id, employee_id) => {
    return new Promise((resolve, reject) => {
        exports.getTimeClocksBase(token, company_id, employee_id)
            .then((response) => {
            const timeClocks = response.data.map((one) => {
                const typeWithLabel = timeClockTypeUtilities_1.typeToTimeClockType(one.type);
                const label = typeWithLabel ? typeWithLabel.label : undefined;
                const timeClock = {
                    date: one.date,
                    datetime: new Date(one.datetime),
                    id: one.id,
                    label: label,
                    note: one.note,
                    original_datetime: one.original_datetime,
                    type: one.type
                };
                return timeClock;
            });
            resolve(timeClocks);
        })
            .catch((axiosError) => {
            const apiError = axiosErrorToApiClientError_1.axiosErrorToApiClientError(axiosError, 'hr', URI, 'get');
            reject(apiError);
        });
    });
};
exports.getTimeClocks = getTimeClocks;

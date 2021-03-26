"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postTimeClocks = exports.postTimeClocksBase = void 0;
const hrRequest_1 = require("../hrRequest");
const dateUtility_1 = require("../../utilities/dateUtility");
const axiosErrorToApiClientError_1 = require("../../axiosErrorToApiClientError");
const URI = '/employees/{emp_id}/time_clocks';
/**
 *
 * @param token https://developer.freee.co.jp/docs/hr/reference#/%E3%82%BF%E3%82%A4%E3%83%A0%E3%83%AC%E3%82%B3%E3%83%BC%E3%83%80%E3%83%BC(%E6%89%93%E5%88%BB)/create
 * @param company_id
 * @param employee_id
 * @param type
 * @returns
 */
const postTimeClocksBase = (token, company_id, employee_id, type, base_date, datetime) => {
    const base_date_string = dateUtility_1.getDateString(base_date);
    const datetime_string = datetime ? dateUtility_1.getDateTimeString(datetime) : null;
    const uri = URI.replace('{emp_id}', `${employee_id}`);
    return hrRequest_1.hrRequest(token).post(uri, {
        company_id,
        type,
        "base_date": base_date_string,
        "datetime": datetime_string
    });
};
exports.postTimeClocksBase = postTimeClocksBase;
const postTimeClocks = (token, company_id, employee_id, type, base_date, datetime) => {
    return new Promise((resolve, reject) => {
        exports.postTimeClocksBase(token, company_id, employee_id, type, base_date, datetime)
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
exports.postTimeClocks = postTimeClocks;

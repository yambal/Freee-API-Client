"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postTimeClocks = exports.postTimeClocksBase = void 0;
const hrRequest_1 = require("../hrRequest");
const dateUtility_1 = require("../../utilities/dateUtility");
const axiosErrorToApiClientError_1 = require("../../axiosErrorToApiClientError");
const URI = '/employees/{emp_id}/time_clocks';
/**
 * 打刻情報の登録
 * https://developer.freee.co.jp/docs/hr/reference#/%E3%82%BF%E3%82%A4%E3%83%A0%E3%83%AC%E3%82%B3%E3%83%BC%E3%83%80%E3%83%BC(%E6%89%93%E5%88%BB)/create
 * 指定した従業員の打刻情報を登録します。
 * 休憩開始の連続や退勤のみなど、整合性の取れていない打刻は登録できません。
 * 退勤の打刻は、すでに登録されている退勤打刻よりも後の時刻であれば上書き登録することができます。
 * 打刻可能種別の取得APIを呼ぶことで、その従業員がその時点で登録可能な打刻種別が取得できます。
 * 打刻が日をまたぐ場合は、base_date(打刻日)に前日の日付を指定してください。
 * datetime(打刻日時)を指定できるのは管理者か事務担当者の権限を持ったユーザのみです。
 * @param token
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
            const apiError = axiosErrorToApiClientError_1.axiosErrorToApiClientError(axiosError, 'hr', URI, 'post');
            reject(apiError);
        });
    });
};
exports.postTimeClocks = postTimeClocks;

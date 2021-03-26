"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAvailableTypes = exports.getAvailableTypesBase = void 0;
const hrRequest_1 = require("../hrRequest");
const axiosErrorToApiClientError_1 = require("../../axiosErrorToApiClientError");
const URI = '/employees/{emp_id}/time_clocks/available_types';
/**
 *
 * @param token
 * @param company_id
 * @param employee_id
 * @returns
 */
const getAvailableTypesBase = (token, company_id, employee_id) => {
    const uri = URI.replace('{emp_id}', `${employee_id}`);
    return hrRequest_1.hrRequest(token, {
        company_id
    }).get(uri);
};
exports.getAvailableTypesBase = getAvailableTypesBase;
const typeToLabel = (type) => {
    switch (type) {
        case 'clock_in':
            return '出勤';
        case 'break_begin':
            return '休憩開始';
        case 'break_end':
            return '休憩終了';
        case 'clock_out':
            return '退勤';
        default:
            return undefined;
    }
};
const typeToTimeClockType = (type) => {
    const label = typeToLabel(type);
    if (label) {
        return {
            type,
            label
        };
    }
    return undefined;
};
const getAvailableTypes = (token, company_id, employee_id) => {
    return new Promise((resolve, reject) => {
        exports.getAvailableTypesBase(token, company_id, employee_id)
            .then((response) => {
            const types = response.data.available_types;
            let available_types = [];
            types.forEach((type) => {
                const withType = typeToTimeClockType(type);
                if (withType) {
                    available_types.push(withType);
                }
            });
            const base_date = new Date(response.data.base_date);
            resolve({
                base_date,
                available_types
            });
        })
            .catch((error) => {
            const apiError = axiosErrorToApiClientError_1.axiosErrorToApiClientError(error, 'hr', URI);
            reject(apiError);
        });
    });
};
exports.getAvailableTypes = getAvailableTypes;

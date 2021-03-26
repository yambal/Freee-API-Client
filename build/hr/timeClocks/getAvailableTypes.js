"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAvailableTypes = exports.getAvailableTypesBase = void 0;
const hrRequest_1 = require("../hrRequest");
const axiosErrorToApiClientError_1 = require("../../axiosErrorToApiClientError");
const timeClockTypeUtilities_1 = require("../../utilities/timeClockTypeUtilities");
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
const getAvailableTypes = (token, company_id, employee_id) => {
    return new Promise((resolve, reject) => {
        exports.getAvailableTypesBase(token, company_id, employee_id)
            .then((response) => {
            const types = response.data.available_types;
            let available_types = [];
            types.forEach((type) => {
                const withType = timeClockTypeUtilities_1.typeToTimeClockType(type);
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
            const apiError = axiosErrorToApiClientError_1.axiosErrorToApiClientError(error, 'hr', URI, 'get');
            reject(apiError);
        });
    });
};
exports.getAvailableTypes = getAvailableTypes;

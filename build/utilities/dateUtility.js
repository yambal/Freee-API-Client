"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMonth = exports.getYear = exports.getDateTimeString = exports.getDateString = void 0;
const getParts = (date, locale) => {
    const formatter = new Intl.DateTimeFormat(locale, {
        year: "numeric", month: "2-digit", day: "2-digit",
        hour: "2-digit", minute: "2-digit", second: "2-digit",
        hour12: false,
        timeZone: "Asia/Tokyo"
    });
    return formatter.formatToParts(date);
};
const getPartsObj = (date, locale) => {
    const parts = getParts(date, locale);
    const tmp = {};
    parts.forEach((part) => {
        tmp[part.type] = part.value;
    });
    const ret = tmp;
    return ret;
};
/**
 * Date から 2021-03-16 のようなStringに整形して返す
 * @param locale
 * @param date
 * @returns
 */
const getDateString = (date, locale) => {
    const partsObj = getPartsObj(date, locale || "Ja-jp");
    return `${partsObj.year}-${partsObj.month}-${partsObj.day}`;
};
exports.getDateString = getDateString;
/**
 * YYYY-MM-DD HH:MM:SS : Date から 2021-03-16 22:37:27 のようなStringに整形して返す
 * @param locale
 * @param date
 * @returns
 */
const getDateTimeString = (date, locale) => {
    const partsObj = getPartsObj(date, locale || "Ja-jp");
    return `${partsObj.year}-${partsObj.month}-${partsObj.day} ${partsObj.hour}:${partsObj.minute}:${partsObj.second}`;
};
exports.getDateTimeString = getDateTimeString;
/**
 * YYYY : Date から 2021 のような String に整形して返す
 * @param locale
 * @param date
 * @returns
 */
const getYear = (date, locale) => {
    const partsObj = getPartsObj(date, locale || "Ja-jp");
    return partsObj.year;
};
exports.getYear = getYear;
/**
 * MM : Date から 03 のような String に整形して返す
 * @param locale
 * @param date
 * @returns
 */
const getMonth = (date, locale) => {
    const partsObj = getPartsObj(date, locale || "Ja-jp");
    return partsObj.month;
};
exports.getMonth = getMonth;

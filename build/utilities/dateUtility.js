"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getElapsedTime = exports.getMonth = exports.getYear = exports.getDateTimeString = exports.getDateString = void 0;
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
/**
 * 二つのDate間の経過時間を返す
 * @param a
 * @param b
 * @returns
 */
const getElapsedTime = (a, b) => {
    const elapsedTimeSec = Math.round(Math.abs(a.getTime() - b.getTime()) / 1000 / 60);
    const hours = Math.floor(elapsedTimeSec / 3600);
    const minutes = Math.floor((elapsedTimeSec - hours * 3600) / 60);
    const seconds = elapsedTimeSec - (hours * 3600) - (minutes * 60);
    return {
        hours,
        minutes,
        seconds
    };
};
exports.getElapsedTime = getElapsedTime;

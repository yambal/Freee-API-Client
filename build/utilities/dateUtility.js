"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getElapsedTimeJpDate = exports.getElapsedTimeJp = exports.getElapsedTime = exports.getMonth = exports.getYear = exports.getDateTimeString = exports.getDateString = void 0;
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
const getElapsedMs = (a, b) => {
    return Math.round(Math.abs(a.getTime() - b.getTime()) / 1000 / 60);
};
/**
 * ミリ秒を経過時間として時間、分、秒で返す
 * @param milliseconds
 * @returns
 */
const getElapsedTime = (milliseconds) => {
    const hours = Math.floor(milliseconds / 3600);
    const minutes = Math.floor((milliseconds - hours * 3600) / 60);
    const seconds = milliseconds - (hours * 3600) - (minutes * 60);
    return {
        hours,
        minutes,
        seconds
    };
};
exports.getElapsedTime = getElapsedTime;
/**
 * ミリ秒を日本語の経過時間として返す
 * @param milliseconds
 * @param hours
 * @param minutes
 * @param seconds
 * @returns
 */
const getElapsedTimeJp = (milliseconds, hours = true, minutes = true, seconds = false) => {
    const elapsedTime = exports.getElapsedTime(milliseconds);
    let res = '';
    if (elapsedTime.hours > 0 && hours) {
        res += `${elapsedTime.hours}時間`;
    }
    if (elapsedTime.minutes > 0 && seconds) {
        res += `${elapsedTime.minutes}分`;
    }
    if (elapsedTime.seconds > 0 && seconds) {
        res += `${elapsedTime.seconds}秒`;
    }
    return res;
};
exports.getElapsedTimeJp = getElapsedTimeJp;
/**
 * 二つの時刻間の経過時間を日本語の経過時間として返す
 * @param a
 * @param b
 * @param hours
 * @param minutes
 * @param seconds
 * @returns
 */
const getElapsedTimeJpDate = (a, b, hours = true, minutes = true, seconds = false) => {
    return exports.getElapsedTimeJp(getElapsedMs(a, b), hours, minutes, seconds);
};
exports.getElapsedTimeJpDate = getElapsedTimeJpDate;

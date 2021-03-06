"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getElapsedTimeJpDate = exports.getElapsedTimeJp = exports.getElapsedTime = exports.getReadableTime = exports.getMonth = exports.getYear = exports.getDateTimeString = exports.getDateString = void 0;
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
 * 現在と同日の場合は日付を日付を付けない
 * @param date
 * @param locale
 * @returns
 */
const getReadableTime = (date, locale) => {
    const partsObj = getPartsObj(date, locale || "Ja-jp");
    if (exports.getDateString(date) === exports.getDateString(new Date())) {
        return `${partsObj.hour}:${partsObj.minute}:${partsObj.second}`;
    }
    return `${partsObj.year}-${partsObj.month}-${partsObj.day} ${partsObj.hour}:${partsObj.minute}:${partsObj.second}`;
};
exports.getReadableTime = getReadableTime;
const getElapsedMilliseconds = (a, b) => {
    return Math.round(Math.abs(a.getTime() - b.getTime()));
};
/**
 * ミリ秒を経過時間として時間、分、秒で返す
 * @param milliseconds
 * @returns
 */
const getElapsedTime = (milliseconds) => {
    const sec = Math.round(milliseconds / 1000);
    const hours = Math.floor(sec / 3600);
    const minutes = Math.floor((sec - hours * 3600) / 60);
    const seconds = sec - (hours * 3600) - (minutes * 60);
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
const getElapsedTimeJp = (milliseconds, hours = true, minutes = true, seconds = false, noneThen = "なし") => {
    const elapsedTime = exports.getElapsedTime(milliseconds);
    let res = '';
    if (elapsedTime.hours > 0 && hours) {
        res += `${elapsedTime.hours}時間`;
    }
    if (elapsedTime.minutes > 0 && minutes) {
        res += `${elapsedTime.minutes}分`;
    }
    if (elapsedTime.seconds > 0 && seconds) {
        res += `${elapsedTime.seconds}秒`;
    }
    if (res.length === 0) {
        return noneThen;
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
const getElapsedTimeJpDate = (a, b, hours = true, minutes = true, seconds = false, noneThen = "なし") => {
    return exports.getElapsedTimeJp(getElapsedMilliseconds(a, b), hours, minutes, seconds, noneThen);
};
exports.getElapsedTimeJpDate = getElapsedTimeJpDate;

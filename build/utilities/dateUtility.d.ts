/**
 * Date から 2021-03-16 のようなStringに整形して返す
 * @param locale
 * @param date
 * @returns
 */
export declare const getDateString: (date: Date, locale?: string | undefined) => string;
/**
 * YYYY-MM-DD HH:MM:SS : Date から 2021-03-16 22:37:27 のようなStringに整形して返す
 * @param locale
 * @param date
 * @returns
 */
export declare const getDateTimeString: (date: Date, locale?: string | undefined) => string;
/**
 * YYYY : Date から 2021 のような String に整形して返す
 * @param locale
 * @param date
 * @returns
 */
export declare const getYear: (date: Date, locale?: string | undefined) => string;
/**
 * MM : Date から 03 のような String に整形して返す
 * @param locale
 * @param date
 * @returns
 */
export declare const getMonth: (date: Date, locale?: string | undefined) => string;
/**
 * ミリ秒を経過時間として時間、分、秒で返す
 * @param milliseconds
 * @returns
 */
export declare const getElapsedTime: (milliseconds: number) => {
    hours: number;
    minutes: number;
    seconds: number;
};
/**
 * ミリ秒を日本語の経過時間として返す
 * @param milliseconds
 * @param hours
 * @param minutes
 * @param seconds
 * @returns
 */
export declare const getElapsedTimeJp: (milliseconds: number, hours?: boolean, minutes?: boolean, seconds?: boolean) => string;
/**
 * 二つの時刻間の経過時間を日本語の経過時間として返す
 * @param a
 * @param b
 * @param hours
 * @param minutes
 * @param seconds
 * @returns
 */
export declare const getElapsedTimeJpDate: (a: Date, b: Date, hours?: boolean, minutes?: boolean, seconds?: boolean) => string;

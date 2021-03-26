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

import { AxiosResponse } from 'axios';
import { TimeClockType, EmployeeTimeClock } from '../hrTypes';
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
export declare const postTimeClocksBase: (token: string, company_id: number, employee_id: number, type: TimeClockType, base_date: Date, datetime?: Date | undefined) => Promise<AxiosResponse<any>>;
export declare const postTimeClocks: (token: string, company_id: number, employee_id: number, type: TimeClockType, base_date: Date, datetime?: Date | undefined) => Promise<EmployeeTimeClock>;

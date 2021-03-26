import { AxiosResponse } from 'axios';
import { EmployeeTimeClock } from '../hrTypes';
/**
 * 打刻情報の一覧取得
 * https://developer.freee.co.jp/docs/hr/reference#/%E3%82%BF%E3%82%A4%E3%83%A0%E3%83%AC%E3%82%B3%E3%83%BC%E3%83%80%E3%83%BC(%E6%89%93%E5%88%BB)/create
 * 指定した従業員・期間の打刻情報を返します。
 * デフォルトでは従業員の当月の打刻開始日から当日までの値が返ります。
 * @param token
 * @param company_id
 * @param employee_id
 * @param type
 * @returns
 */
/**
 * TODO: 他にオプションアリ
 */
export declare const getTimeClocksBase: (token: string, company_id: number, employee_id: number, from?: Date | undefined) => Promise<AxiosResponse<any>>;
export declare const getTimeClocks: (token: string, company_id: number, employee_id: number, from?: Date | undefined) => Promise<EmployeeTimeClock[]>;

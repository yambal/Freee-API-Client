import { AxiosResponse } from 'axios';
import { TimeClockType, EmployeeTimeClock } from '../hrTypes';
/**
 *
 * @param token https://developer.freee.co.jp/docs/hr/reference#/%E3%82%BF%E3%82%A4%E3%83%A0%E3%83%AC%E3%82%B3%E3%83%BC%E3%83%80%E3%83%BC(%E6%89%93%E5%88%BB)/create
 * @param company_id
 * @param employee_id
 * @param type
 * @returns
 */
export declare const postTimeClocksBase: (token: string, company_id: number, employee_id: number, type: TimeClockType, base_date: Date, datetime?: Date | undefined) => Promise<AxiosResponse<any>>;
export declare const postTimeClocks: (token: string, company_id: number, employee_id: number, type: TimeClockType, base_date: Date, datetime?: Date | undefined) => Promise<EmployeeTimeClock>;

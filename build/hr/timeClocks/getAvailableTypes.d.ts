import { AvailableTypes } from '../hrTypes';
import { AxiosResponse } from 'axios';
export declare const getAvailableTypesBase: (token: string, company_id: number, employee_id: number) => Promise<AxiosResponse<any>>;
export declare const getAvailableTypes: (token: string, company_id: number, employee_id: number) => Promise<AvailableTypes>;

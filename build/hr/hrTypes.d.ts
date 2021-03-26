export declare type HrCompany = {
    id: number;
    name: string;
    role: "company_admin" | "self_only";
    external_cid: string;
    employee_id: number;
    display_name: number;
};
export declare type HrUser = {
    id: number;
    companies: HrCompany[];
};
export declare type TimeClockType = "clock_in" | "break_begin" | "break_end" | "clock_out";
export declare type EmployeeTimeClock = {
    id: number;
    date: string;
    type: TimeClockType;
    datetime: string;
    original_datetime: string;
    note: string;
};

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
export declare type TimeClockTypeLabel = "出勤" | "休憩開始" | "休憩終了" | "退勤";
export declare type EmployeeTimeClock = {
    id: number;
    date: string;
    type: TimeClockType;
    datetime: Date;
    original_datetime: string;
    note: string;
    label: TimeClockTypeLabel | undefined;
};
export declare type TimeClockTypeWithLabel = {
    type: TimeClockType;
    label: TimeClockTypeLabel;
};
export declare type AvailableTypes = {
    base_date: Date;
    available_types: TimeClockTypeWithLabel[];
};

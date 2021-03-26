export type HrCompany = {
  id: number
  name: string
  role: "company_admin" | "self_only"
  external_cid: string
  employee_id: number
  display_name: number
}

export type HrUser = {
  id: number
  companies: HrCompany[]
}

export type TimeClockType = "clock_in" | "break_begin" | "break_end" | "clock_out"
export type TimeClockTypeLabel = "出勤" | "休憩開始" | "休憩終了" | "退勤"

export type EmployeeTimeClock = {
  id: number
  date: string
  type: TimeClockType
  datetime: string
  original_datetime: string
  note: string
}

export type TimeClockTypeWithLabel = {
  type: TimeClockType
  label: TimeClockTypeLabel
}

export type AvailableTypes = {
  base_date: Date
  available_types: TimeClockTypeWithLabel[]
}
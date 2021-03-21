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
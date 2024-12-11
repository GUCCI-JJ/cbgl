enum OrgType {
  company = 1,
  self = 2
}
export type OrgForm = {
  type: OrgType,
  name: string,
  legal_person: string
}

export type JoinOrgForm = {
  user_id: number,
  org_id: number | null
}
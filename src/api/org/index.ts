import type { JoinOrgForm, OrgForm } from "@/tools/orgDataForm";
import Http from "../http";
const http = new Http("/org")

//获取组织列表
export const getOrgList = () => http.get("/getOrgList")

//保存组织
export const saveOrg = (orgForm: OrgForm) => http.post("/saveOrg", orgForm)

//加入组织
export const joinOrg = (joinOrgForm: JoinOrgForm) => http.post("/joinOrg", joinOrgForm)
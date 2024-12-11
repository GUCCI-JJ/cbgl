import type { MachineForm } from "@/tools/manageDataForm";
import Http from "../http";

const http = new Http("/machine")

//获取机械分类
export const getSorts = () => http.get("/getSorts")

//添加分类
export const saveSort = (machine_sort_name: string) => http.post("/saveSort", { machine_sort_name })

//获取机械
export const getMachines = (sort_id: number) => http.get("/getMachines", { sort_id })

//添加机械
export const saveMachine = (fileUrls: string[], machineForm: MachineForm) => http.post("/saveMachine", { fileUrls, machineForm })
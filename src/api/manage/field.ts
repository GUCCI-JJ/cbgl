import type { FieldCropForm, FieldForm } from "@/tools/manageDataForm";
import Http from "../http";

const http = new Http("/field")

//获取土地列表
export const getFields = () => http.get(`/getFields`)

//新增土地
export const saveField = (fieldForm: FieldForm) => http.post("/saveField", fieldForm)

//获取土地类型列表
export const getFieldTypes = () => http.get("/getFieldTypes")

//获取作物列表
export const getCrops = () => http.get("/getCrops")

//保存土地作物
export const saveFieldCrop = (fieldCropForm: FieldCropForm) => http.post("/saveFieldCrop", fieldCropForm)

//开始农事
export const startEvent = (types: number[], field_crop_id: number, remark: string) => http.post("/startEvent", { types, field_crop_id, remark })

//更新农事
export const updateEvent = (field_crop_id: number, type: number, remark: string) => http.post('/updateEvent', { field_crop_id, type, remark })

//结束农事
export const endEvent = (field_crop_id: number, type: number, remark: string) => http.post('/endEvent', { field_crop_id, type, remark })
interface Crop {
  field_crop_id: number,
  crop_name: string,
  crop_type: string,
  hoed: number,
  hoedDate?: Date,
  seed: number,
  seedDate?: Date,
  field_type: string,
  field_subtype: string,
  crop_area: number,
  health: number,
  fertilize: number,
  medicine: number,
  operationList: Array<{
    operation_id: number,
    type: number,
    timeline: Array<{
      product_name: string | null,
      amount: number | null,
      date: string,
      finish_mark: number,
      remark: string
    }>

  }>
}

export interface Field {
  field_id: number,
  field_name: string,
  field_area: number,
  location: string,
  cropList: Crop[]
}

export interface FieldForm {
  user_id: number,
  field_name: string,
  location: string,
  area: number,
}

export interface FieldCropForm {
  field_id: number,
  crop_id: number,
  field_subtype_id: number,
  area: number,
  hoed: number,
  hoedDate: string,
  seed: number,
  seedDate: string,
  health: number,
  medicine: number,
  fertilize: number
}

type ProductAttrValue = {
  value: string
}

type ProductAttr = {
  attr_name: string,
  attr_value_list: ProductAttrValue[]
}

type ProductAttrCombine = {
  combine: Object,
  price: number,
  stock: number
}

export type ProductForm = {
  sort_id: number | null,
  name: string | null,
  basic_price: number,
  attr_list: ProductAttr[],
  combine_list: ProductAttrCombine[]
}

export type Sort = {
  id: number,
  name: string
}

export type Product = {
  id: number,
  sort_id?: number,
  sort_name?: string,
  url: string,
  name: string,
  basic_price: number,
  org_name?: string
}

export type Machine = {
  id: number,
  sort_id?: number,
  sort_name?: string,
  url: string,
  name: string,
  basic_price: number,
  org_name?: string
}

export type MachineForm = {
  sort_id: number | null,
  name: string | null,
  basic_price: number,
}
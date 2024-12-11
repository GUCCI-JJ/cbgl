export type ProductInfo = {
  id: number,
  product_name: string,
  basic_price: number,
  imgList: Array<string>,
  attrList: Array<{
    attr_name: string,
    valueList: Array<{
      attr_value_id: number,
      value: string
    }>
  }>
}
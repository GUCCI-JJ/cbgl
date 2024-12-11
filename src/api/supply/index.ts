import Http from '../http'

const http = new Http('/supply')

//获取商品列表
export const getProducts = () => http.get("/getProducts")

//获取商品信息
export const getProductInfo = (id: number) => http.get("/getProductInfo", { id })

//根据商品id和属性组合hash获取价格和库存
export const getCombinePS = (product_id: number, combine: string) => http.get("/getCombinePS", { product_id, combine })
import type { ProductForm } from "@/tools/manageDataForm";
import Http from "../http";

const http = new Http("/product")

//获取商品分类
export const getSorts = () => http.get("/getSorts")

//添加分类
export const saveSort = (product_sort_name: string) => http.post("/saveSort", { product_sort_name })

//获取商品
export const getProducts = (sort_id: number) => http.get("/getProduct", { sort_id })

//添加商品
export const saveProduct = (fileUrls: string[], productForm: ProductForm) => http.post("/saveProduct", { fileUrls, productForm })
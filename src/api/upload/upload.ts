import type { UploadFiles } from 'element-plus'
import Http from '../http'

const http = new Http("")

export const uploadImage = (file: UploadFiles) => http.post("/upload", file)
import Http from "../http";

const http = new Http("/user")

//获取用户信息
export const getUserInfo = () => http.get("/getUserInfo")
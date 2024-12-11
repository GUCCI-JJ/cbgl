import type { SignForm, userLoginForm } from "@/tools/userDataForm";
import Http from "../http";

const http = new Http("")

//登录
export const login = (userForm: userLoginForm) => http.post("/login", userForm)

//注册
export const sign = (signForm: SignForm) => http.post("/sign", signForm)
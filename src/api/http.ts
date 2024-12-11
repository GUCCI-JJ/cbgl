import router from '@/router'
import pinia from '@/stores'
import { useUserStore } from '@/stores/user'
import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios'
import type { Action } from 'element-plus'

class Http {
  http: AxiosInstance
  // 设定一个全局标志，用于控制提示只弹出一次
  isLoginExpired: boolean
  constructor(baseUrl: string) {
    this.isLoginExpired = false
    this.http = axios.create({
      baseURL: `http://localhost:3000/api${baseUrl}`,
      timeout: 10000,
      withCredentials: true,  // 确保携带凭证
    })



    //请求拦截
    this.http.interceptors.request.use((config) => {
      const token = localStorage.getItem("token")
      config.headers!['Authorization'] = token
      return config
    }, (err) => {
      console.log('http.js-请求拦截:', err);
    })

    //响应拦截
    this.http.interceptors.response.use(res => {
      const userStore = useUserStore(pinia)
      //将登录状态改为false
      userStore.modifyAuth(true)
      this.isLoginExpired = false
      return res
    }, (err) => {
      console.log('http.js-响应拦截:', err);
      if (err.status === 400) {
        //@ts-ignore
        ElMessageBox.alert(err.response.data.msg, '提示', {
          // if you want to disable its autofocus
          // autofocus: false,
          confirmButtonText: '好的',
          callback: (action: Action) => {

          },
        })
      }
      else if (err.status === 401) {
        if (!this.isLoginExpired) {
          const userStore = useUserStore(pinia)
          this.isLoginExpired = true
          //将登录状态改为false
          userStore.modifyAuth(false)
          //@ts-ignore
          ElMessageBox.confirm(
            '您的登录信息已过期，是否现在去重新登录？',
            '提示',
            {
              confirmButtonText: '好的',
              cancelButtonText: '待会再重新登录',
              type: 'warning',
            }
          )
            .then(() => {
              //重新加载
              router.replace("/login")
            })
            .catch(() => {
            })
        }

      }
    })
  }

  public async get(url: string, data?: Object) {
    const res = await this.http.get(url, {
      params: {
        ...data
      }
    })
    return res.data
  }

  public async post(url: string, data: any) {
    const res = await this.http.post(url, data)
    return res.data
  }
}

export default Http
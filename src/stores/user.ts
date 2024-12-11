import { getUserInfo } from "@/api/user/user";
import { defineStore } from "pinia";
import { reactive, ref, type Reactive, type Ref } from "vue";

export const useUserStore = defineStore('user', () => {
  //用户信息
  const userInfo: Reactive<any> = reactive({})
  //更新用户信息
  const modifyUserInfo = (data: object) => {
    Object.assign(userInfo, data)
  }
  //如果用户信息为空，调用接口
  const fetchUserInfo = async () => {
    const data = await getUserInfo()
    modifyUserInfo(data)
  }

  //token是否有效
  const Authorization: Ref = ref(true)
  //修改token有效标志
  function modifyAuth(value: boolean) {
    Authorization.value = value
  }
  return { Authorization, modifyAuth, userInfo, modifyUserInfo, fetchUserInfo }
})
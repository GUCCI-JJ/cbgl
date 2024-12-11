<template>
  <div class="container">
    <div class="login-wrapper">
      <div class="header">登录</div>
      <div class="form-wrapper">
        <input type="text" name="username" v-model="userForm.account" placeholder="请输入用户名" class="input-item">
        <input type="password" name="password" v-model="userForm.password" placeholder="请输入密码" class="input-item">
        <div class="btn" @click="handleLogin">登录</div>
      </div>
      <div class="msg">
        没有账号？
        <RouterLink to="/sign">立即注册</RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { login } from '@/api/login/login';
import router from '@/router';
import { useUserStore } from '@/stores/user';
import type { userLoginForm } from '@/tools/userDataForm';
import { reactive, type Reactive } from 'vue';

const userForm: Reactive<userLoginForm> = reactive({
  account: "",
  password: ""
})
const userStore = useUserStore()
//登录按钮
const handleLogin = async () => {
  const res: any = await login(userForm)
  localStorage.setItem("token", res.token)
  userStore.modifyAuth(true)
  //获取用户信息之后再跳转
  await userStore.fetchUserInfo()
  router.replace("/")
}
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
  background-image: linear-gradient(to right, #fbc2eb, #a6c1ee);
}

.login-wrapper {
  background-color: #fff;
  width: 358px;
  height: 588px;
  border-radius: 15px;
  padding: 0 50px;
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.header {
  font-size: 38px;
  font-weight: bold;
  text-align: center;
  line-height: 200px;
}

.input-item {
  display: block;
  width: 100%;
  margin-bottom: 20px;
  border: 0;
  padding: 10px;
  border-bottom: 1px solid rgb(128, 125, 125);
  font-size: 15px;
  outline: none;
}

.input-item:placeholder {
  text-transform: uppercase;
}

.btn {
  text-align: center;
  padding: 10px;
  width: 100%;
  margin-top: 40px;
  background-image: linear-gradient(to right, #a6c1ee, #fbc2eb);
  color: #fff;
}

.msg {
  text-align: center;
  line-height: 88px;
}

a {
  text-decoration-line: none;
  color: #abc1ee;
}
</style>
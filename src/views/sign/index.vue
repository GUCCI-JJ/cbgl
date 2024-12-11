<template>
  昵称<el-input v-model="signForm.nick_name" style="width: 240px" placeholder="请输入密码" />
  密码<el-input v-model="signForm.password" style="width: 240px" placeholder="请输入密码" />
  确认密码<el-input v-model="rePassword" style="width: 240px" placeholder="请再次输入密码" />
  手机号<el-input v-model="signForm.phone" style="width: 240px" placeholder="请输入" />
  微信号<el-input v-model="signForm.wechat" style="width: 240px" placeholder="请输入" />
  <el-button @click="handleSign">注册</el-button>
</template>

<script setup lang="ts">
import { sign } from '@/api/login/login';
import type { SignForm } from '@/tools/userDataForm';
import { reactive, ref, type Reactive, type Ref } from 'vue';

//注册表单
const signForm: Reactive<SignForm> = reactive({
  nick_name: "",
  password: "",
  phone: "",
  email: "",
  wechat: ""
})
//确认密码
const rePassword: Ref = ref("")

//注册提交
const handleSign = async () => {
  const res = await sign(signForm)
  console.log(res);

}
</script>

<style lang="scss" scoped></style>
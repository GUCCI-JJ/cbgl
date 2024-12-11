<template>
  <el-menu :ellipsis="false" :router="true" :default-active="headerMenu.defaultActive" class="el-menu-demo"
    mode="horizontal" @select="handleMenuSelect">
    <el-menu-item v-for="item in headerMenu.list" :index="item.path">
      {{ item.text }}
    </el-menu-item>
    <el-menu-item>
      <el-popover :width="300"
        popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px; padding: 20px;">
        <template #reference>
          <el-avatar :src="userInfo.avatar_url" />
        </template>
        <template #default>
          <div class="demo-rich-conent" style="display: flex; gap: 16px; flex-direction: column">
            <el-avatar :size="60" :src="userInfo.avatar_url" style="margin-bottom: 8px" />
            <div>
              <div class="nick_name">{{ userInfo.nick_name }}</div>
              <div class="org">{{ userInfo.org_name || '无组织' }}</div>
            </div>
            <div @click="handleLogout">
              <el-icon>
                <SwitchButton></SwitchButton>
              </el-icon>
              退出登录
            </div>
          </div>
        </template>
      </el-popover>
    </el-menu-item>
  </el-menu>
</template>

<script setup lang="ts">
import router from '@/router';
import { useUserStore } from '@/stores/user';
import type { MenuForm } from '@/tools/menuDataForm';
import { reactive, type Reactive } from 'vue';

//用户信息
const { userInfo } = useUserStore()

let headerMenu: Reactive<MenuForm> = reactive({
  defaultActive: "",
  list: [{ path: "", name: "", text: "" }]
})
Object.assign(headerMenu, {
  defaultActive: "/manage",
  list: [
    { path: "/manage", name: "manage", text: "管理" },
    { path: "/supply", name: "supply", text: "购农资" },
    { path: "/sell", name: "sell", text: "卖农产" },
    { path: "/mine", name: "mine", text: "我的" },
  ]
})
//如果localstorage.curHeader不为空，则赋值给defaultActive
if (localStorage.getItem('curHeader'))
  headerMenu.defaultActive = localStorage.getItem('curHeader')!

//menu选择
const handleMenuSelect = (e: string) => {
  localStorage.setItem('curHeader', e)
}

//退出登录
const handleLogout = async () => {
  //@ts-ignore
  ElMessageBox.confirm(
    '是否确认退出登录',
    '提示',
    {
      confirmButtonText: "退出",
      cancelButtonText: "取消",
      type: 'warning'
    }
  ).then(() => {
    localStorage.setItem('token', '')
    router.replace("/login")
  }).catch(() => { })

}
</script>


<style lang="scss" scoped>
.el-menu--horizontal>.el-menu-item:nth-last-child(2) {
  margin-right: auto;
}
</style>
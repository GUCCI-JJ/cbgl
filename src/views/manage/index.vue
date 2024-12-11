<template>
  <el-container>
    <el-aside width="200px">
      <Aside :asideMenu="asideMenu"></Aside>
    </el-aside>
    <el-main>
      <el-scrollbar>
        <RouterView></RouterView>
      </el-scrollbar>
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import Aside from '@/components/layout/aside/index.vue'
import { reactive, type Reactive } from 'vue';
//侧边导航格式type
import type { MenuForm } from '@/tools/menuDataForm';

let asideMenu: Reactive<MenuForm> = reactive({
  defaultActive: "",
  list: [{ path: "", name: "", text: "", icon: "" }]
})
Object.assign(asideMenu, {
  defaultActive: "/manage/field",
  list: [
    {
      path: "/manage/field",
      name: "field",
      text: "土地管理",
      icon: "MapLocation"
    },
    {
      path: "/manage/fund",
      name: "fund",
      text: "资金管理",
      icon: "Coin"
    },
    {
      path: "/manage/warehouse",
      name: "warehouse",
      text: "仓库管理",
      icon: "House"
    },
    {
      path: "/manage/product",
      name: "product",
      text: "商品管理",
      icon: "Box"
    },
  ]
})
</script>

<style lang="scss" scoped>
.el-aside {
  height: calc(100vh - 60px);
}

.el-main {
  height: calc(100vh - 60px);
  padding: 0;
}
</style>
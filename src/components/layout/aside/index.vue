<template>
  <el-scrollbar>
    <el-menu :router="true" :default-active="asideMenu.defaultActive">
      <el-menu-item v-for="item in asideMenu.list" :index="item.path">
        <el-icon :size="'1em'">
          <component :is="item.icon"></component>
        </el-icon>
        {{ item.text }}
      </el-menu-item>
      <!-- <el-sub-menu index="3">
        <template #title>
          <el-icon>
            <setting />
          </el-icon>Navigator Three
        </template>
<el-menu-item-group>
  <template #title>Group 1</template>
  <el-menu-item index="3-1">Option 1</el-menu-item>
  <el-menu-item index="3-2">Option 2</el-menu-item>
</el-menu-item-group>
<el-menu-item-group title="Group 2">
  <el-menu-item index="3-3">Option 3</el-menu-item>
</el-menu-item-group>
<el-sub-menu index="3-4">
  <template #title>Option 4</template>
  <el-menu-item index="3-4-1">Option 4-1</el-menu-item>
</el-sub-menu>
</el-sub-menu> -->
    </el-menu>
  </el-scrollbar>
</template>

<script setup lang="ts">
import type { MenuForm } from '@/tools/menuDataForm';
import type { PropType } from 'vue';
const { asideMenu } = defineProps({
  asideMenu: {
    type: Object as PropType<MenuForm>,
    required: true
  }
})
</script>

<style lang="scss" scoped>
:global(.el-scrollbar__view) {
  height: 100%;
}

.el-menu {
  height: 100%;
}
</style>
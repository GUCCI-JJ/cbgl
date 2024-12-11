<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <Header></Header>
      </el-header>
      <el-container>
        <RouterView></RouterView>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import Header from './header/index.vue'
</script>

<style lang="scss" scoped>
.common-layout {
  height: 100%;

  .el-header {
    border-bottom: 1px solid var(--el-border-color);
  }


}
</style>
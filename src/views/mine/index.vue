<template>
  <div class="container">
    <div class="body">
      <el-button @click="handleShowJoinOrg">加入组织</el-button>
      <el-button @click="handleShowAddOrg">新增组织</el-button>
    </div>
  </div>
  <AddOrg ref="addOrgRef"></AddOrg>
  <JoinOrg ref="joinOrgRef"></JoinOrg>
</template>

<script setup lang="ts">
import AddOrg from '@/components/org/addOrg.vue';
import JoinOrg from '@/components/org/joinOrg.vue';
import { ref, type Ref } from 'vue';

const joinOrgRef: Ref = ref()
const handleShowJoinOrg = () => {
  joinOrgRef.value.handleShow()
}
const addOrgRef: Ref = ref()
const handleShowAddOrg = () => {
  addOrgRef.value.handleShow()
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: calc(100vh - 60px);
  padding: 0;
  display: grid;
  grid-template-areas:
    '. body .';
  grid-template-rows: 100%;
  grid-template-columns: 1fr 1200px 1fr;
  background-color: #F3F6F8;

  .body {
    grid-area: body;
    background-color: #fff;
  }
}
</style>
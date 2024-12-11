<template>
  <div class="header">
    <div class="title">您的土地</div>
    <el-button-group size="large">
      <el-button type="default" :icon="'Refresh'" @click="handleGetFields">刷新</el-button>
      <el-button type="primary" :icon="'Plus'" @click="handleShowAddField">
        新增土地
      </el-button>
    </el-button-group>
  </div>
  <el-space :size="20" direction="vertical" fill style="width: 100%;">
    <FieldCard v-for="item in fieldList" :field="item" @refresh="handleGetFields" @sendField="handleCurField"
      :addCropDialogRef="addCropDialogRef">
    </FieldCard>
  </el-space>
  <AddFieldDialog ref="addFieldDialogRef"></AddFieldDialog>
  <AddCropDialog ref="addCropDialogRef" :maxArea="curField.field_area" :fieldId="curField.field_id">
  </AddCropDialog>
</template>

<script setup lang="ts">
import { provide, reactive, ref, type Reactive, type Ref } from 'vue';
import FieldCard from './components/fieldCard.vue';
import type { Field } from '@/tools/manageDataForm';
import { getFields } from '@/api/manage/field';

//获取土地列表
let fieldList: Reactive<Field[]> = reactive([]);
const handleGetFields = async () => {
  const res: any = await getFields()
  fieldList.splice(0)
  fieldList.push(...res)
}
handleGetFields();
//将刷新土地列表的方法provide，共后代组件使用
provide("handleGetFields", handleGetFields)

//新增土地：显示addFieldDialog
import AddFieldDialog from './dialogs/addFieldDialog.vue';
const addFieldDialogRef: Ref = ref()
const handleShowAddField = (): void => {
  addFieldDialogRef.value.handleShow()
}

//新增作物:获取当前field传给addCropDialog
import AddCropDialog from './dialogs/addCropDialog.vue';
const addCropDialogRef: Ref = ref()
const curField: Reactive<any> = reactive({})
const handleCurField = (field: Field) => {
  Object.assign(curField, field)
}
</script>

<style lang="scss" scoped>
.header {
  padding: 40px 20px 10px;
  display: flex;
  justify-content: space-between;

  .title {
    font-weight: 600;
    color: #606266;
    font-size: 25px;
  }
}


.el-space {
  padding: 20px;
  box-sizing: border-box;
}
</style>
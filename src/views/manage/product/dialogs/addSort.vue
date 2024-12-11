<template>
  <el-dialog v-model="isShow" title="添加分类" :close-on-click-modal="false" width="500" center>
    <div class="dialog-body">
      分类名称
      <el-input v-model="product_sort_name" style="width: 240px" placeholder="请为分类命名" clearable />
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="isShow = false">取消</el-button>
        <el-button type="primary" @click="handleSaveFertilize">
          保存
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { saveSort } from '@/api/manage/product';
import { inject, ref, type Ref } from 'vue';

const isShow: Ref = ref(false)
const handleShow = () => {
  isShow.value = !isShow.value
}
defineExpose({ handleShow })

//刷新分类列表
const handleGetSorts = inject("handleGetSorts") as Function

//分类名称
const product_sort_name: Ref = ref(null)

//保存
const handleSaveFertilize = async () => {
  const res = await saveSort(product_sort_name.value)
  //@ts-ignore
  ElMessage({
    message: '添加分类成功',
    type: 'success',
  })
  handleGetSorts()
  handleShow()
}


</script>

<style lang="scss" scoped></style>
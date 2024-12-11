<template>
  <el-dialog v-model="isShow" title="更新农事" :close-on-click-modal="false" width="500" center>
    <div class="dialog-body">
      <div class="remark-box">
        <div class="label">备注</div>
        <div class="input">
          <el-input v-model="remark" type="textarea" placeholder="记录农事备注(选填)"></el-input>
        </div>
      </div>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="isShow = false" size="large">取消</el-button>
        <el-button type="primary" @click="handleUpdateEvent" size="large">
          保存更新
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { updateEvent } from '@/api/manage/field';
import { inject, ref, type Ref } from 'vue';

const { field_crop_id, type } = defineProps({
  field_crop_id: {
    type: Number,
    required: true
  },
  type: {
    type: Number,
    validator(value: number) {
      return [1, 2, 3, 4].includes(value)
    },
    required: true
  },
})

const remark: Ref = ref('')
//保存更新
const handleGetFields = inject('handleGetFields') as Function
const handleUpdateEvent = async () => {
  const res = await updateEvent(field_crop_id, type, remark.value)
  await handleGetFields()
  //@ts-ignore
  ElMessage({
    message: res.msg,
    type: "success"
  })
  handleShow()
}

let isShow: Ref = ref(false)
function handleShow(): void {
  isShow.value = !isShow.value
}
defineExpose({ handleShow })
</script>

<style lang="scss" scoped></style>
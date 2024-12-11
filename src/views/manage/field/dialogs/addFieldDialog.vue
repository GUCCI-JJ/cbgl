<template>
  <el-dialog v-model="isShow" title="新增土地" :close-on-click-modal="false" width="500" center>
    <div class="dialog-body">
      <el-text class="mx-1" type="primary">
        <el-icon>
          <InfoFilled></InfoFilled>
        </el-icon>
        农作物在土地创建后，在对应的土地中添加
      </el-text>
      <div class="form-body">
        <div class="form-item">
          <div class="label">名称</div>
          <div class="input">
            <el-input v-model="fieldForm.field_name" style="width: 240px" placeholder="土地名称" clearable />
          </div>
        </div>
        <div class="form-item">
          <div class="label">总面积</div>
          <div class="input">
            <el-input-number v-model="fieldForm.area" :precision="1" :step="0.1" :min="0" :max="99999" />
          </div>
          <div class="unit">亩</div>
        </div>
        <div class="form-item">
          <div class="label">地址</div>
          <div class="input">
            <el-input v-model="fieldForm.location" style="width: 240px" :rows="2" type="textarea"
              placeholder="土地地址（选填）" />
          </div>
        </div>
      </div>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="isShow = false">取消</el-button>
        <el-button type="primary" @click="handleSaveField">
          保存
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { saveField } from '@/api/manage/field';
import { useUserStore } from '@/stores/user';
import type { FieldForm } from '@/tools/manageDataForm';
import { inject, reactive, ref, watch, type Reactive, type Ref } from 'vue';

//刷新土地列表
const handleGetFields = inject("handleGetFields") as Function;

const defaultFieldForm: FieldForm = {
  user_id: 0,
  field_name: "",
  area: 0,
  location: '',
}
//新增表单
let fieldForm: Reactive<FieldForm> = reactive(defaultFieldForm)
//新增保存
async function handleSaveField() {
  if (!fieldForm.user_id) {
    //@ts-ignore
    ElMessage('获取用户信息失败，请尝试刷新用户信息后尝试', '提示')
  }
  const res = await saveField(fieldForm)
  handleGetFields()
  handleShow()
}

//控制对话框展示
let isShow: Ref = ref(false)
function handleShow(): void {
  isShow.value = !isShow.value
}

//在对话框打开时再获取vuex用户id，确保getUserInfo接口调用
watch(isShow, (nv, ov) => {
  if (nv === true) {
    //用户信息
    const { userInfo } = useUserStore()
    //如果getUserInfo接口失败，则赋值0，提交保存时校不能为0
    fieldForm.user_id = userInfo.id || 0
  }
})
defineExpose({ handleShow })
</script>

<style lang="scss" scoped>
.dialog-body {
  .form-body {
    .form-item {
      display: flex;
      align-items: center;
    }
  }
}
</style>
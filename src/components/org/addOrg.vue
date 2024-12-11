<template>
  <el-dialog v-model="isShow" title="创建组织" :close-on-click-modal="false" width="500" center>
    <div class="dialog-body">
      <div class="form-body">
        <div class="form-item">
          <div class="label">组织类型</div>
          <div class="input">
            <el-radio-group v-model="orgForm.type">
              <el-radio :value="1" size="large">公司</el-radio>
              <el-radio :value="2" size="large">个体户</el-radio>
            </el-radio-group>
          </div>
        </div>
        <div class="form-item">
          <div class="label">名称</div>
          <div class="input">
            <el-input v-model="orgForm.name" style="width: 240px" :placeholder="orgForm.type === 1 ? '公司名称' : '商铺名称'"
              clearable />
          </div>
        </div>
        <div class="form-item">
          <div class="label">法定代表人</div>
          <div class="input">
            <el-input v-model="orgForm.legal_person" style="width: 240px"
              :placeholder="orgForm.type === 1 ? '公司法人代表' : '商铺法人代表'" clearable />
          </div>
        </div>
      </div>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="isShow = false">取消</el-button>
        <el-button type="primary" @click="handleSaveOrg">
          保存
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { saveOrg } from '@/api/org';
import type { OrgForm } from '@/tools/orgDataForm';
import { reactive, ref, type Reactive, type Ref } from 'vue';

//组织表单
const orgForm: Reactive<OrgForm> = reactive({
  type: 1, //1 公司；2 个体户
  name: "",
  legal_person: ""
})
//保存组织
const handleSaveOrg = async () => {
  const res = await saveOrg(orgForm)
  handleShow()
}

//控制对话框展示
let isShow: Ref = ref(false)
function handleShow(): void {
  isShow.value = !isShow.value
}
defineExpose({ handleShow })
</script>

<style lang="scss" scoped></style>
<template>
  <el-dialog v-model="isShow" title="加入组织" :close-on-click-modal="false" width="500" center>
    <div class="dialog-body">
      <div class="form-body">
        <div class="form-item">
          <div class="label">组织类型</div>
          <div class="input">
            <el-select v-model="joinOrgForm.org_id" filterable placeholder="可搜索" style="width: 240px">
              <el-option v-for="item in orgList" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
          </div>
        </div>
      </div>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="isShow = false">取消</el-button>
        <el-button type="primary" @click="handleJoin">
          加入
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { getOrgList, joinOrg } from '@/api/org';
import { useUserStore } from '@/stores/user';
import type { JoinOrgForm } from '@/tools/orgDataForm';
import { reactive, ref, watch, type Reactive, type Ref } from 'vue';

//组织列表
const orgList: Reactive<any> = reactive([]);
const handleGetOrgList = async () => {
  const res = await getOrgList()
  orgList.push(...res)
}
handleGetOrgList()

//加入表单
const joinOrgForm: Reactive<JoinOrgForm> = reactive({
  user_id: 0,
  org_id: null
})
//确认加入
const handleJoin = async () => {
  const res = await joinOrg(joinOrgForm)
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
    joinOrgForm.user_id = userInfo.id || 0
  }
})
defineExpose({ handleShow })
</script>

<style lang="scss" scoped></style>
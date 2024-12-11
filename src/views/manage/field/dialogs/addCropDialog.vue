<template>
  <el-dialog v-model="isShow" title="添加作物" center>
    <div class="dialog-body">
      <div class="form-body">
        <div class="form-item">
          <div class="label">作物</div>
          <div class="input">
            <el-cascader v-model="cropForm.crop_type" :options="crops" placeholder="可搜索" clearable filterable />
          </div>
        </div>
        <div class="form-item">
          <div class="label">土地类型</div>
          <div class="input">
            <el-cascader v-model="cropForm.field_type" :options="fieldTypes" placeholder="可搜索" clearable filterable />
          </div>
        </div>
        <el-text class="mx-1" type="primary">
          <el-icon>
            <InfoFilled></InfoFilled>
          </el-icon>
          最大不超过这块土地的总面积：{{ maxArea }} 亩
        </el-text>
        <div class="form-item">
          <div class="label">面积</div>
          <div class="input">
            <el-input-number v-model="cropForm.area" :precision="1" :step="0.1" :min="0" :max="maxArea" />
          </div>
          <div class="unit">亩</div>
        </div>
        <div class="form-item">
          <div class="label">是否开地</div>
          <div class="input">
            <el-radio-group v-model="cropForm.hoed">
              <el-radio :value="0" size="large">未开地</el-radio>
              <el-radio :value="1" size="large">已开地</el-radio>
            </el-radio-group>
          </div>
        </div>
        <div class="form-item" v-show="cropForm.hoed">
          <div class="label">开地日期</div>
          <div class="input">
            <el-date-picker v-model="cropForm.hoedDate" type="date" placeholder="选择开地日期" value-format="YYYY-MM-DD" />
          </div>
        </div>
        <div class="form-item" v-show="cropForm.hoed">
          <div class="label">是否播种</div>
          <div class="input">
            <el-radio-group v-model="cropForm.seed">
              <el-radio :value="0" size="large">未播种</el-radio>
              <el-radio :value="1" size="large">已播种</el-radio>
            </el-radio-group>
          </div>
        </div>
        <div class="form-item" v-show="cropForm.seed">
          <div class="label">播种日期</div>
          <div class="input">
            <el-date-picker v-model="cropForm.seedDate" type="date" placeholder="选择开地日期" value-format="YYYY-MM-DD" />
          </div>
        </div>
        <div class="form-item" v-show="cropForm.seed">
          <div class="label">健康状态</div>
          <div class="input">
            <el-radio-group v-model="cropForm.health">
              <el-radio :value="1" size="large">健康</el-radio>
              <el-radio :value="0" size="large">不健康</el-radio>
            </el-radio-group>
          </div>
        </div>
        <div class="form-item" v-show="cropForm.seed">
          <div class="label">打药次数</div>
          <div class="input">
            <el-input-number v-model="cropForm.medicine" :min="0" :max="999" />
          </div>
        </div>
        <div class="form-item" v-show="cropForm.seed">
          <div class="label">施肥次数</div>
          <div class="input">
            <el-input-number v-model="cropForm.fertilize" :min="0" :max="999" />
          </div>
        </div>
      </div>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="isShow = false">取消</el-button>
        <el-button type="primary" @click="handleHoedConfirm">
          保存
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { getCrops, getFieldTypes, saveFieldCrop } from '@/api/manage/field';
import { useUserStore } from '@/stores/user';
import { inject, reactive, ref, watch, type Reactive, type Ref } from 'vue';

//作物最大面积，来自哪个field
const { maxArea, fieldId } = defineProps(['maxArea', 'fieldId'])
//刷新土地列表方法：来自index
const handleGetFields = inject("handleGetFields") as Function;

//获取YYYY-MM-DD格式的今日日期
const formDate = (): string => {
  let date = new Date();
  return date.getFullYear() + "-" + ((date.getMonth() + 1).toString().padStart(2, '0')) + "-" + ((date.getDate()).toString().padStart(2, '0'));
}
//作物表单
let cropForm: Reactive<any> = reactive({
  user_id: 0,
  crop_type: [],
  field_type: [],
  hoed: 0,
  hoedDate: formDate(),
  seed: 0,
  seedDate: formDate(),
  area: 0,
  health: 1,
  medicine: 0,
  fertilize: 0
})

//土地种类列表:级联选择
let fieldTypes: Reactive<any> = reactive([]);
const handleGetFieldTypes = async () => {
  const res: any = await getFieldTypes()
  fieldTypes.splice(0)
  fieldTypes.push(...res)
}
handleGetFieldTypes()

//作物种类列表:级联选择器
let crops: Reactive<any> = reactive([])
const handleGetCrops = async () => {
  const res: any = await getCrops()
  crops.splice(0)
  crops.push(...res)
}
handleGetCrops()

//提交确认开地
const handleHoedConfirm = async (): Promise<void> => {
  let { crop_type, field_type, ...rest } = cropForm
  let obj = {
    field_id: fieldId,
    crop_id: crop_type[1],
    field_subtype_id: field_type[1],
    ...rest
  }
  await saveFieldCrop(obj)
  handleGetFields()
  handleShow()
}

//开地对话框开关
let isShow: Ref = ref(false)
//控制对话框开关
const handleShow = (): void => {
  isShow.value = !isShow.value
}
//在对话框打开时再获取vuex用户id，确保getUserInfo接口调用
watch(isShow, (nv, ov) => {
  if (nv === true) {
    //用户信息
    const { userInfo } = useUserStore()
    //如果getUserInfo接口失败，则赋值0，提交保存时校不能为0
    cropForm.user_id = userInfo.id || 0
  }
})
defineExpose({ handleShow })
</script>

<style lang="scss" scoped></style>
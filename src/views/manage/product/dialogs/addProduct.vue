<template>
  <el-dialog v-model="isShow" title="添加商品" :close-on-click-modal="false" width="700" center>
    <div class="dialog-body">
      <div class="step-box">
        <el-steps :active="curStep" align-center>
          <el-step v-for="item in stepList" :title="item.title"></el-step>
        </el-steps>
      </div>
      <div class="form-box">
        <div class="step0" v-show="curStep === 0">
          商品图片
          <el-upload :action="uploadUrl" :on-success="handleUploadSuccess" list-type="picture-card" :auto-upload="false"
            :on-change="handleFileListChange" :on-preview="handlePreview" :on-remove="handleRemoved" ref="UploadRef"
            multiple name="files">
            <el-icon>
              <Plus />
            </el-icon>
          </el-upload>
          商品分类
          <el-select v-model="productForm.sort_id">
            <el-option v-for="item in sortList" :label="item.name" :value="item.id"></el-option>
          </el-select>
          商品名称
          <el-input v-model="productForm.name" placeholder="请给商品命名"></el-input>
          基础价格
          <el-input-number v-model="productForm.basic_price" :min="0" :precision="2" />
        </div>
        <div class="step1" v-show="curStep === 1">
          属性
          <el-button @click="handleAddAttr">添加属性</el-button>
          <el-card v-for="(item, index) in productForm.attr_list" shadow="hover">
            <el-input v-model="item.attr_name" placeholder="属性名"></el-input>
            <el-button @click="handleAddAttrValue(index)">添加值</el-button>
            <el-tag v-for="t in item.attr_value_list">
              <el-input v-model="t.value"></el-input>
            </el-tag>
          </el-card>
        </div>
        <div class="step2" v-if="curStep === 2">
          <div>基础价：￥ {{ productForm.basic_price }}</div>
          <el-text class="mx-1" type="primary">
            <el-icon>
              <InfoFilled></InfoFilled>
            </el-icon>
            默认设置为基础价：￥{{ productForm.basic_price }}，您可以自定义定价
          </el-text>
          <el-table border :data="productForm.combine_list">
            <el-table-column v-for="item in priceStock" :prop="item" :label="item"></el-table-column>
            <el-table-column prop="price" label="定价">
              <template #default="scope">
                <el-input-number v-model="scope.row.price" :min="0" :precision="2"></el-input-number>
              </template>
            </el-table-column>
            <el-table-column prop="stock" label="库存">
              <template #default="scope">
                <el-input-number v-model="scope.row.stock" :min="0"></el-input-number>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>

    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="isShow = false">取消</el-button>
        <el-button v-if="curStep > 0" type="primary" @click="curStep--">
          上一步
        </el-button>
        <el-button v-if="curStep < 3" type="primary" @click="curStep++">
          下一步
        </el-button>
        <el-button v-else type="primary" @click="handleSaveProduct">
          保存
        </el-button>
      </div>
    </template>
  </el-dialog>
  <el-dialog v-model="dialogVisible">
    <img w-full :src="dialogImageUrl" alt="Preview Image" />
  </el-dialog>
</template>

<script setup lang="ts">
import { saveProduct } from '@/api/manage/product';
import { uploadImage } from '@/api/upload/upload';
import type { ProductForm, Sort } from '@/tools/manageDataForm';
import type { UploadFile, UploadFiles, UploadRawFile } from 'element-plus';
import { computed, reactive, ref, watch, type Reactive, type Ref } from 'vue';

const isShow: Ref = ref(false)
const handleShow = () => {
  isShow.value = !isShow.value
}
defineExpose({ handleShow })

//接商品分类
const { sortList } = defineProps({
  sortList: { type: Array<Sort> }
})

//图片上传接口地址
const uploadUrl: Ref = ref('http://localhost:3000/api/upload');
//图片列表
const fileList: Reactive<UploadFiles> = reactive([])
//上传成功后图片地址
const fileUrls: Reactive<string[]> = reactive([])
const dialogImageUrl = ref('')
const dialogVisible = ref(false)

//图片上传成功回调，后续保存图片路径到商品
const handleUploadSuccess = async (response: any, uploadFile: UploadFile, uploadFiles: UploadFiles) => {
  await new Promise((resolve, reject) => {
    fileUrls.length = 0
    fileUrls.push(...uploadFiles.map((e: UploadFile): string => {
      //@ts-ignore
      if (e.response && e.response.files[0]) {
        //@ts-ignore
        const { destination, filename } = e.response.files[0]
        return `http://localhost:3000/${destination}${filename}`
      }
      return ''

    }))
    if (fileUrls.length === fileList.length && fileUrls.indexOf('') === -1) {
      resolve(1)
    }

  })
  await saveProduct(fileUrls, productForm)
  handleShow()

}

//文件列表改变回调
const handleFileListChange = (uploadFile: UploadFile, uploadFiles: UploadFiles) => {
  fileList.length = 0
  fileList.push(...uploadFiles)
  console.log(fileList, fileList.length);

}

//预览回调
const handlePreview = (uploadFile: UploadFile) => {
  dialogImageUrl.value = uploadFile.url!
  dialogVisible.value = true
}

//移除回调
const handleRemoved = (uploadFile: UploadFile, uploadFiles: UploadFiles) => {
  fileList.length = 0
  fileList.push(...uploadFiles)
}


//商品表单
const productForm: Reactive<ProductForm> = reactive({
  sort_id: null,
  name: null,
  basic_price: 0,
  attr_list: [],
  combine_list: [],
})

//步骤控制
const curStep: Ref = ref(0) //当前在哪步
const stepList = [ //步骤条数据
  { title: "基本信息" },
  { title: "商品属性" },
  { title: "定价/库存" },
]

//添加属性
const handleAddAttr = () => {
  productForm.attr_list.push({
    attr_name: "",
    attr_value_list: []
  })
}

//添加属性值
const handleAddAttrValue = (index: number) => {
  productForm.attr_list[index].attr_value_list.push({ value: "" })
}

//当来到定价/库存时，根据属性列表计算combine_list
watch(curStep, (nv, ov) => {
  if (nv === 2) {
    //@ts-ignore
    productForm.combine_list = productForm.attr_list.reduce((acc, cur) => {
      const newAcc: { [x: string]: string | number; price: number; stock: number; }[] = []
      //@ts-ignore
      if (acc.length === 0) {
        cur.attr_value_list.forEach(e => {
          newAcc.push({ [cur.attr_name]: e.value, price: productForm.basic_price, stock: 0 })
        })
      }
      //@ts-ignore
      acc.forEach(accItem => {
        cur.attr_value_list.forEach(e => {
          //@ts-ignore
          newAcc.push({ ...accItem, [cur.attr_name]: e.value, price: productForm.basic_price, stock: 0 })
        })
      })
      return newAcc
    }, [])
    console.log(productForm);

  }
})
//根据combine_list第一个值计算得到属性列表作为表头
const priceStock = computed(() => {
  return Object.keys(productForm.combine_list[0]).filter(o => o !== 'price' && o !== 'stock')
})

//保存
const UploadRef: Ref = ref()
const handleSaveProduct = async () => {
  UploadRef.value.submit()
}

</script>

<style lang="scss" scoped></style>
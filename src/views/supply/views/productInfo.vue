<template>
  <el-scrollbar style="width: 100%;">
    <div class="productInfo">
      <div class="main-container">
        <div class="org-info">
          <div class="front">
            <el-image style="width: 40px;height: 40px;border-radius: 50%;"></el-image>
            <div class="org-name">高力高园艺旗舰店</div>
          </div>
          <div class="back">
            <el-button :icon="Shop">进入店铺</el-button>
          </div>
        </div>
        <div class="pro-info">
          <div class="img-list">
            <el-image v-for="(item) in proInfo.imgList" :src="item"
              style="width: 94px;height: 94px;border-radius: 10px;"></el-image>
          </div>
          <div class="big-img">
            <el-image :src="proInfo.imgList[0]" style="width: 644px;height: 644px;border-radius: 10px;"></el-image>
          </div>
          <div class="info-container">
            <div class="name">{{ proInfo.product_name }}</div>
            <div class="price">￥<span>{{ proInfo.basic_price }}</span></div>
            <div class="attr-list">
              <div class="attr-item" v-for="(item, index) in proInfo.attrList">
                <div class="name">
                  {{ item.attr_name }}
                </div>
                <div class="attr-value-list">
                  <el-radio-group v-model="pickedList[index]">
                    <el-radio-button v-for="t in item.valueList" :label="t.value"
                      :value="`${item.attr_name}:${t.value}`" border />
                  </el-radio-group>
                </div>
              </div>
              <div class="attr-item">
                <div class="name">数量</div>
                <div>
                  <el-input-number :max="100" :min="1"></el-input-number>
                </div>
              </div>
            </div>
            <el-button>立即下单</el-button>
          </div>

        </div>
      </div>
    </div>
  </el-scrollbar>
</template>

<script setup lang="ts">
import { getCombinePS, getProductInfo } from '@/api/supply';
import type { ProductInfo } from '@/tools/supplyDataForm';
import { Shop } from '@element-plus/icons-vue'
import { reactive, ref, watch, type Reactive, type Ref } from 'vue';
import { useRoute } from 'vue-router';

const { query: { id } }: { query: { id?: number } } = useRoute()

//获取商品信息
const proInfo: Reactive<ProductInfo> = reactive({
  id: 0,
  product_name: "",
  basic_price: 0,
  imgList: [],
  attrList: []
})
//选中属性项列表
const pickedList: Reactive<Array<string>> = reactive([])
const handleGetProductInfo = async () => {
  Object.assign(proInfo, await getProductInfo(id!))
  pickedList.push(...proInfo.attrList.map((e) => ''))
}
handleGetProductInfo()

//下单表单
const orderForm: Reactive<any> = reactive({
  combine_id: 0
})

//选完了属性组合后发起请求得到组合id/价格/库存/
//当前选中的库存量
const curStock: Ref = ref(0)
watch(pickedList, async (nv, ov) => {
  if (nv.indexOf("") !== -1) return
  const { id: combine_id, price, stock } = await getCombinePS(id!, nv.join("-"));
  orderForm.combine_id = combine_id;
  curStock.value = stock;
  proInfo.basic_price = price

}, { deep: true })



</script>

<style lang="scss" scoped>
.productInfo {
  background-color: #F3F6F8;
  width: 100%;
  height: calc(100vh - 60px);
  display: grid;
  grid-template-areas: '. main .';
  grid-template-columns: minmax(30px, 200px) minmax(784px, 1fr) minmax(30px, 200px);

  .main-container {
    grid-area: main;

    .org-info {
      margin-top: 40px;
      background-color: #fff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px;
      border-radius: 20px;

      .front {
        display: flex;
        align-items: center;

        .org-name {
          margin-left: 10px;
        }
      }
    }

    .pro-info {
      background-color: #fff;
      margin-top: 20px;
      border-radius: 20px;
      display: flex;
      padding: 30px;

      .img-list {
        display: flex;
        flex-direction: column;
        gap: 20px;
        padding-right: 15px;
      }

      .info-container {
        padding-left: 40px;

        >.name {
          font-weight: 600;
          font-size: 20px;
          padding-bottom: 20px;
        }

        .price {
          font-weight: 600;
          color: #FF5000;
          padding-bottom: 20px;

          span {
            font-size: 30px;
          }
        }

        .attr-list {
          .attr-item {
            display: flex;
            padding-bottom: 20px;

            .name {
              width: 80px;
              padding-right: 20px;
              color: #7C889C;
              text-align: right;
            }

            .attr-value-list {
              flex: 1;
              display: flex;
              flex-wrap: wrap;
              gap: 10px;

              .attr-value-item {
                border: 1px solid #DADDE0;
                padding: 5px 10px;
                border-radius: 5px;
                cursor: pointer;

                &:hover {
                  border-color: #FF5000;
                  color: #FF5000;
                }
              }
            }
          }
        }
      }
    }
  }
}

.el-radio-group {
  gap: 10px
}

:global(.el-radio-button__inner) {
  border: 1px solid #DCDFE6;
  border-radius: var(--el-border-radius-base);

  &:first-child,
  &:last-child {
    border-radius: var(--el-border-radius-base) !important;
  }

  // &:hover {
  //   color: #FF5000;
  //   border: 1px solid #FF5000;
  // }
  :global(:root) {
    --el-color-primary: #FF5000;
  }
}

:global(.el-radio-button.is-active .el-radio-button__original-radio:not(:disabled)+.el-radio-button__inner) {
  background-color: #FF5000;
  border-color: #FF5000;
  box-shadow: none;
}
</style>
<template>
  <div class="header">
    <div class="title">您的商品</div>
    <el-button-group size="large">
      <el-button type="default" :icon="'Refresh'">刷新</el-button>
      <el-button type="primary" :icon="'Plus'" @click="handleShowAddSort">
        添加分类
      </el-button>
      <el-button type="primary" :icon="'Plus'" @click="handleShowAddProduct">
        添加商品
      </el-button>
    </el-button-group>
  </div>
  <div class="container">
    <div class="menu-box">
      <el-menu :default-active="curSort" @select="handleSortChange">
        <el-menu-item v-for="item in menuList" :index="item.id + ''">{{ item.name }}</el-menu-item>
      </el-menu>
    </div>
    <div class="product-box">
      <div class="product-list">
        <div class="product-item" v-for="item in productList">
          <div class="img">
            <el-image style="width: 100px;height: 100px;border-radius: 10px;" :src="item.url"></el-image>
          </div>
          <div class="name">{{ item.name }}</div>
          <div class="price">￥{{ item.basic_price }} 起</div>
        </div>
      </div>
    </div>
  </div>
  <AddSort ref="addSortRef"></AddSort>
  <AddProduct ref="addProductRef" :sortList="menuList"></AddProduct>
</template>

<script setup lang="ts">
import { provide, reactive, ref, type Reactive, type Ref } from 'vue';
import AddSort from './dialogs/addSort.vue';
import AddProduct from './dialogs/addProduct.vue';
import { getProducts, getSorts } from '@/api/manage/product';
import type { Product, Sort } from '@/tools/manageDataForm';
import { useUserStore } from '@/stores/user';

//分类列表
const menuList: Reactive<Sort[]> = reactive([])
//当前选中的分类
const curSort: Ref = ref('0')
//获取分类
const handleGetSorts = async () => {
  const res: Sort[] = await getSorts()
  menuList.splice(0)
  menuList.push(...res)
}
//商品列表
const productList: Reactive<Product[]> = reactive([]);
const handleGetProduct = async (sort_id: number) => {
  const res: Product[] = await getProducts(sort_id)
  productList.length = 0
  productList.push(...res)
}
//获取分类列表并选中第一个分类,获取商品
(async () => {
  await handleGetSorts()
  curSort.value = menuList[0].id + ''
  handleGetProduct(menuList[0].id)
})();

provide('handleGetSorts', handleGetSorts)

//分类切换
const handleSortChange = (key: string) => {
  if (key === curSort.value) return
  curSort.value = key
  handleGetProduct(Number(key))
}


//打开添加分类
const { userInfo } = useUserStore()
const addSortRef: Ref = ref()
const handleShowAddSort = () => {

  if (!userInfo.org_id || userInfo.org_id === '') {
    //@ts-ignore
    ElMessageBox.alert('请加入组织后再进行操作')
    return
  }

  addSortRef.value.handleShow()
}
//打开添加商品
const addProductRef: Ref = ref()
const handleShowAddProduct = () => {
  if (!userInfo.org_id || userInfo.org_id === '') {
    //@ts-ignore
    ElMessageBox.alert('请加入组织后再进行操作')
    return
  }
  addProductRef.value.handleShow()
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

.container {
  display: flex;


  .menu-box {
    width: 200px;
    margin: 0 20px 0;

    .el-menu {
      border: 1px solid var(--el-menu-border-color);
      border-radius: 10px;
    }

  }

  .product-box {
    flex: 1;
    padding: 0 10px;
    height: 100%;
    overflow: hidden;

    .product-list {
      .product-item {
        display: flex;

        &:not(:last-child) {
          padding-bottom: 10px;
        }
      }
    }
  }
}
</style>
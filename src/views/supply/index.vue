<template>
  <div class="supply">
    <div class="search-box">
      <el-input v-model="queryStr" style="width: 40%;" size="large" :prefix-icon="Search"></el-input>
      <el-button type="primary" size="large">搜 索</el-button>
    </div>
    <div class="menu-box">
      <el-menu :default-active="curType" @select="handleTypeChange">
        <el-menu-item v-for="item in typeList" :index="item.id + ''">{{ item.name }}</el-menu-item>
      </el-menu>
    </div>
    <div class="product-container">
      <ProductCard v-for="item in productList" :product-info="item"></ProductCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, type Reactive, type Ref } from 'vue';
import { Search } from '@element-plus/icons-vue'
import type { Product } from '@/tools/manageDataForm';
import { getProducts } from '@/api/supply';
import ProductCard from '@/components/product/productCard.vue';
const queryStr: Ref = ref("")

//分类列表
const typeList: Reactive<any> = reactive([
  {
    id: 1,
    name: "肥料"
  },
  {
    id: 2,
    name: "种子"
  },
  {
    id: 3,
    name: "农药"
  },
])
const curType: Ref = ref('1')
const handleTypeChange = () => { }

const productList: Reactive<Product[]> = reactive([])
//获取列表
const handleGetProducts = async () => {
  const res: Product[] = await getProducts()
  productList.length = 0
  productList.push(...res)
}
handleGetProducts()

</script>

<style lang="scss" scoped>
.supply {
  padding: 20px;
  width: 100%;
  display: grid;
  grid-template-areas:
    'search search search'
    '. list .';
  grid-template-columns: 200px minmax(740px, 5fr) minmax(10px, 1fr);

  .search-box {
    grid-area: search;
    display: flex;
    justify-content: center;
    gap: 10px;
    padding-bottom: 50px;
  }

  .menu-box {
    width: 200px;
    margin: 0 20px 0;

    .el-menu {
      border: 1px solid var(--el-menu-border-color);
      border-radius: 10px;
    }

  }

  .el-card {
    border: 1px solid transparent;
    padding: 5px;

    &:hover {
      box-shadow: none;
      border: 1px solid #409EFF;
    }
  }

  :global(.el-card__body) {
    padding: 0;
  }

  .product-container {
    grid-area: list;
    display: grid;
    grid-template-columns: repeat(auto-fit, 250px);
    gap: 15px;
    place-content: center;
  }
}

.router-link-active {
  text-decoration: none;
  color: #fff;
}

a {
  text-decoration: none;
  // color: #fff;
}
</style>
<template>
  <el-card shadow="hover">
    <RouterLink tag="a" target="_blank" :to="{ path: '/productInfo', query: { id: productInfo.id } }">
      <div class="product-item">
        <div class="img-box">
          <el-image style="width: 100%; height: 100%;border-radius: 5px;" :src="productInfo.url"></el-image>
        </div>
        <div class="product-name">{{ productInfo.name }}</div>
        <div class="price-paid">
          <div class="price">￥<span>{{ productInfo.basic_price }}</span></div>
          <div class="paid">1人付款</div>
        </div>
        <div class="org-name">{{ productInfo.org_name }}</div>
      </div>
    </RouterLink>
  </el-card>
</template>

<script setup lang="ts">
const { productInfo } = defineProps({
  productInfo: {
    type: Object,
    required: true
  }
})
</script>

<style lang="scss" scoped>
.product-item {
  cursor: pointer;

  .img-box {
    width: 240px;
    height: 240px;
    border-radius: 5px;
  }

  .product-name {
    line-height: 24px;
    color: #11192d;
    font-size: 16px;
    margin: 5px 0 20px;
    display: -webkit-box;
    /* 设置为弹性盒模型 */
    -webkit-line-clamp: 2;
    /* 限制显示为两行 */
    -webkit-box-orient: vertical;
    /* 设置盒模型的排列方向为纵向 */
    overflow: hidden;
    /* 超出部分隐藏 */
    text-overflow: ellipsis;
    /* 超出的文本用省略号表示 */
  }

  .price-paid {
    display: flex;
    justify-content: space-between;

    .price {
      font-size: 14px;
      font-weight: 600;
      color: #000;

      span {
        font-size: 20px;
      }
    }

    .paid {
      color: #50607A;
      font-size: 14px;
    }
  }

  .org-name {
    color: #50607A;
    font-size: 14px;
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
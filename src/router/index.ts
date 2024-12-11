import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '../components/layout/index.vue'
import { useUserStore } from '@/stores/user'
//import.meta.env.BASE_URL
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'layout',
      component: Layout,
      redirect: "/manage/field",
      children: [
        {
          path: "/manage",
          name: "manage",
          component: () => import("@/views/manage/index.vue"),
          redirect: "/manage/field",
          children: [
            {
              path: "/manage/field",
              name: "field",
              component: () => import("@/views/manage/field/index.vue")
            },
            {
              path: "/manage/fund",
              name: "fund",
              component: () => import("@/views/manage/fund/index.vue")
            },
            {
              path: "/manage/warehouse",
              name: "warehouse",
              component: () => import('@/views/manage/warehouse/index.vue')
            },
            {
              path: "/manage/product",
              name: "product",
              component: () => import('@/views/manage/product/index.vue')
            },
          ]
        },
        {
          path: "/supply",
          name: "supply",
          component: () => import("@/views/supply/index.vue"),
        },
        {
          path: "/sell",
          name: "sell",
          component: () => import("@/views/sell/index.vue"),
        },
        {
          path: "/mine",
          name: "mine",
          component: () => import("@/views/mine/index.vue"),
        },
        {
          path: "/productInfo",
          name: "productInfo",
          component: () => import("@/views/supply/views/productInfo.vue")
        }
      ]
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/login/index.vue")
    },
    {
      path: "/sign",
      name: "sign",
      component: () => import("@/views/sign/index.vue")
    }
  ]
})

//前置路由守卫
router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  // 如果用户没有登录，且想访问需要登录的页面，重定向到登录页
  if (to.path !== '/login' && to.path !== '/sign' && !userStore.Authorization) {
    //@ts-ignore
    ElMessageBox.confirm(
      '您的登录信息已过期，是否现在去重新登录？',
      '提示',
      {
        confirmButtonText: '好的',
        cancelButtonText: '待会再重新登录',
        type: 'warning',
      }
    )
      .then(() => {
        next('/login')
      })
      .catch(() => {
      })

  }

  next()
})

export default router

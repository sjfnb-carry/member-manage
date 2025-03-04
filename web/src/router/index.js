import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import MainBoxView from '@/views/MainBoxView.vue'
import routesConfig from './config' // 导入动态路由配置
import { useGetterRouterStore } from '@/stores/getterRouter' // 管理路由状态的 Store
import { useUserInfoStore } from '@/stores/userInfo' // 管理用户信息的 Store

// 创建路由实例
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "login",
      component: LoginView,
    }
    // 主界面路由（mainbox）将根据权限动态添加
  ],
})

// 全局前置导航守卫
router.beforeEach((to, from, next) => {
  const GetterRouterStore = useGetterRouterStore()

  // 1. 目标路由是登录页：直接放行
  if (to.name === "login") {
    next()
    return
  }

  // 2. 检查登录状态
  const token = localStorage.getItem("token")
  if (!token) {
    // 未登录：重定向到登录页
    next({ path: "/login" })
    return
  }

  // 3. 已登录但路由未初始化：动态配置路由
  if (!GetterRouterStore.isGetterRouter) {
    // 移除旧的 mainbox 路由（如果存在）
    if (router.hasRoute("mainbox")) {
      router.removeRoute("mainbox")
    }
    // 动态配置路由并重新跳转到目标路径
    ConfigRouter()
    next({ path: to.fullPath })
  } else {
    // 路由已初始化：直接放行
    next()
  }
})

/**
 * 动态配置路由函数
 * 根据用户权限将路由配置添加到 mainbox 父路由下
 */
const ConfigRouter = () => {
  // 1. 添加主容器路由（如果不存在）
  if (!router.hasRoute("mainbox")) {
    router.addRoute({
      path: "/mainbox",
      name: "mainbox",
      component: MainBoxView,
    })
  }
  // 2. 根据权限添加子路由
  routesConfig.forEach(item => {
    if (checkPermission(item)) {
      router.addRoute("mainbox", item) // 添加到 mainbox 的嵌套路由
    }
  })
  // 3. 标记路由配置完成
  const GetterRouterStore = useGetterRouterStore()
  GetterRouterStore.changeGetterRouter(true)
}

/**
 * 权限校验函数
 * @param {Object} item - 路由配置项
 * @returns {boolean} - 是否有权限访问该路由
 */
const checkPermission = (item) => {
  const userInfoStore = useUserInfoStore()
  // 检查路由是否需要管理员权限
  if (item.requireAdmin) {
    return userInfoStore.userInfo.role === 1 // role=1 表示管理员
  }
  return true // 默认允许访问
}

export default router

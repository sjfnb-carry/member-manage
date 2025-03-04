<template>
  <el-aside width="auto">

    <!-- 设置菜单的折叠状态和路由模式 -->
    <el-menu :collapse="isCollapsed" :router="true" :default-active="route.fullPath">
      <el-menu-item index="/index">
        <el-icon>
          <HomeFilled />
        </el-icon>
        <span>首页</span>
      </el-menu-item>

      <el-menu-item index="/center">
        <el-icon>
          <Avatar />
        </el-icon>
        <span>个人中心</span>
      </el-menu-item>


      <el-sub-menu index="/user-manage" v-admin>
        <template #title>
          <el-icon>
            <UserFilled />
          </el-icon>
          <span>用户管理</span>
        </template>
        <el-menu-item index="/user-manage/adduser">添加用户</el-menu-item>
        <el-menu-item index="/user-manage/userlist">用户列表</el-menu-item>
      </el-sub-menu>

      <el-sub-menu index="/menber-manage">
        <template #title>
          <el-icon>
            <MessageBox />
          </el-icon>
          <span>会员管理</span>
        </template>
        <el-menu-item-group title="会员用户管理">
          <el-menu-item index="/member-manage/addmember">添加会员</el-menu-item>
          <el-menu-item index="/member-manage/memberlist">会员列表</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="会员等级管理">
          <el-menu-item index="/memberlevel-manage/addlevel">添加等级</el-menu-item>
          <el-menu-item index="/memberlevel-manage/levellist">等级列表</el-menu-item>
        </el-menu-item-group>

      </el-sub-menu>

      <el-sub-menu index="/product-manage">
        <template #title>
          <el-icon>
            <Reading />
          </el-icon>
          <span>会员活动管理</span>
        </template>
        <el-menu-item index="/activity-manage/addactivity">添加活动</el-menu-item>
        <el-menu-item index="/activity-manage/activitylist">活动列表</el-menu-item>
      </el-sub-menu>

    </el-menu>
  </el-aside>
</template>

<script setup>
import { useCollapseStore } from '@/stores/collapse'
import { useUserInfoStore } from '@/stores/userInfo';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
import { HomeFilled, Avatar, UserFilled, MessageBox, Reading } from '@element-plus/icons-vue'

// 使用 Vue Router 的 useRoute 钩子获取当前路由信息
const route = useRoute()
// 输出当前路由的完整路径
// console.log(route.fullPath);
const userInfoStore = useUserInfoStore()
const vAdmin = {
  mounted(el) {
    if (userInfoStore.userInfo.role !== 1) {
      el.parentNode.removeChild(el)
    }
  },
}

const collapseStore = useCollapseStore()
const { isCollapsed } = storeToRefs(collapseStore)
</script>

<style lang="scss" scoped>
.el-aside {
  height: 100vh;

  .el-menu {
    height: 100vh;
  }
}
</style>

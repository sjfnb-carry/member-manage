<template>
  <el-header>
    <div class="left">
      <el-icon @click="handleCollapsed">
        <Menu />
      </el-icon>
      <span style="margin-left: 10px;">超市会员积分管理系统</span>
    </div>

    <div class="right">
      <span>欢迎 {{ userInfo.username }} 回来</span>
      <el-dropdown>
        <span class="el-dropdown-link">
          <el-icon :size="30" color="white">
            <User />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="handleCenter">个人中心</el-dropdown-item>
            <el-dropdown-item @click="handleLogout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-header>
</template>

<script setup>
import { useCollapseStore } from '@/stores/collapse';
import { useUserInfoStore } from '@/stores/userInfo';
import { Menu, User } from '@element-plus/icons-vue';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

// 创建路由器实例，用于导航操作
const router = useRouter();

// 创建用户信息存储器实例，用于管理用户信息
const userInfoStore = useUserInfoStore();
// 将用户信息存储器中的userInfo转换为响应式引用
const { userInfo } = storeToRefs(userInfoStore);

// 创建折叠菜单存储器实例，用于管理菜单折叠状态
const collapseStore = useCollapseStore();
// 处理菜单折叠状态改变的函数
const handleCollapsed = () => {
  collapseStore.changeCollapsed();
};

// 导航到用户中心页面的函数
const handleCenter = () => {
  router.push('/center');
}

// 处理用户登出的函数
const handleLogout = () => {
  // 移除本地token
  localStorage.removeItem('token');
  // 清除用户信息存储器中的用户信息
  userInfoStore.clearUserInfo()
  // 导航到登录页面
  router.push('/login');
}

</script>

<style lang="scss">
.el-header {
  background-color: #2d3a4b;
  color: white;
  width: 100%;
  height: 60px;
  line-height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;

}

.left,
.right {
  display: flex;
}

.left {
  i {
    margin: auto;
    cursor: pointer;
  }
}

.right {
  .el-dropdown {
    margin: auto;
  }
}
</style>

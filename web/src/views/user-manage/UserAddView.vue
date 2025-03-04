<template>
  <div>
    <!-- 页面头部，显示标题和返回导航 -->
    <el-page-header content="添加用户" icon="" title="用户管理" />

    <!-- 用户表单，配置验证规则和标签宽度 -->
    <el-form ref="userFormRef" style="max-width: 600px" :model="userForm" :rules="userFormRules" label-width="120px"
      class="demo-userForm" status-icon>

      <!-- 用户名输入项 -->
      <el-form-item label="用户名" prop="username">
        <el-input v-model="userForm.username" />
      </el-form-item>

      <!-- 密码输入项 -->
      <el-form-item label="密码" prop="password">
        <el-input v-model="userForm.password" />
      </el-form-item>

      <!-- 角色选择项 -->
      <el-form-item label="角色" prop="role">
        <el-select v-model="userForm.role" placeholder="选择角色" style="width: 100%">
          <!-- 角色选项：1-管理员，2-普通用户 -->
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>

      <!-- 个人简介输入项 -->
      <el-form-item label="个人简介" prop="introduction">
        <el-input type="textarea" v-model="userForm.introduction" />
      </el-form-item>

      <!-- 头像上传组件 -->
      <el-form-item label="头像" prop="avatar">
        <!-- 自定义上传组件，监听头像更新事件 -->
        <UpLoad :avatar="userForm.avatar" @update:avatar="handleChange"></UpLoad>
      </el-form-item>

      <!-- 表单提交按钮 -->
      <el-form-item>
        <el-button type="primary" @click="submitForm()">添加用户</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script setup>
import UpLoad from "@/components/upload/UpLoad.vue";
import upload from "@/util/upload";
import { ElMessage } from "element-plus";
import { ref, reactive } from "vue";
import { useUserInfoStore } from '@/stores/userInfo';
import { useRouter } from 'vue-router'

// 初始化路由和状态管理
const router = useRouter()
const userInfoStore = useUserInfoStore()

// 表单引用和响应式数据
const userFormRef = ref();
const userForm = reactive({
  username: "",
  password: "",
  role: 2,        // 1-管理员，2-普通用户（默认普通用户）
  introduction: "",
  avatar: "",     // 头像预览地址
  gender: 0,      // 0-保密（默认值）
  file: null      // 原始文件对象
});

// 表单验证规则配置
const userFormRules = reactive({
  username: [
    { required: true, message: "请输入用户名", trigger: "blur" },
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
  ],
  introduction: [
    { required: true, message: "请输入个人简介", trigger: "blur" },
  ],
  role: [
    { required: true, message: "请选择用户角色", trigger: "blur" },
  ],
  avatar: [
    { required: true, message: "请选择头像", trigger: "blur" },
  ],
});

// 角色选项配置
const options = [
  { label: '管理员', value: 1 },
  { label: '普通用户', value: 2 }
]

/**
 * 处理头像变更事件
 * @param {File} file - 上传的文件对象
 */
const handleChange = (file) => {
  // 生成预览URL并更新表单
  userForm.avatar = URL.createObjectURL(file)
  // 保存原始文件用于后续上传
  userForm.file = file
}

/**
 * 提交表单处理函数
 */
const submitForm = () => {
  // 执行表单验证
  userFormRef.value.validate(async (valid) => {
    if (valid) {
      // 调用封装的upload方法提交数据到后台
      await upload('http://localhost:3000/adminapi/user/add', userForm)
        .then(res => {
          if (res.data.ActionType === "OK") {
            // 更新全局用户信息并提示成功
            userInfoStore.changeUserInfo(res.data.data)
            ElMessage.success('更新成功')
            // 跳转到用户列表页
            router.push('/user-manage/userlist')
          } else {
            ElMessage.error('更新失败')
          }
        })
        .catch(err => console.error('请求失败:', err))
    }
  })
}
</script>

<style lang="scss" scoped>
/* 表单顶部间距调整 */
.demo-userForm {
  margin-top: 50px;
}
</style>

<template>
  <div>
    <!-- 页面头部，显示标题和返回导航 -->
    <el-page-header content="添加会员" icon="" title="会员用户管理" />

    <!-- 用户表单，配置验证规则和标签宽度 -->
    <el-form ref="memberFormRef" style="max-width: 600px" :model="memberForm" :rules="memberFormRules"
      label-width="120px" class="demo-memberForm" status-icon>


      <el-form-item label="会员名" prop="name">
        <el-input v-model="memberForm.name" />
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="memberForm.phone" />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="memberForm.email" />
      </el-form-item>
      <el-form-item label="身份证号" prop="id_card">
        <el-input v-model="memberForm.id_card" />
      </el-form-item>
      <el-form-item label="地址" prop="address">
        <el-input v-model="memberForm.address" />
      </el-form-item>
      <el-form-item label="注册时间" prop="register_time">
        <el-date-picker v-model="memberForm.register_time" type="date" placeholder="选择日期" />
      </el-form-item>
      <el-form-item label="会员等级" prop="level_name">
        <el-select v-model="memberForm.level_name" placeholder="请选择会员等级">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>



      <!-- 表单提交按钮 -->
      <el-form-item>
        <el-button type="primary" @click="submitForm()">添加用户</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script setup>
import { ElMessage } from "element-plus";
import { ref, reactive } from "vue";
import axios from "axios";
import dayjs from "dayjs";
import { useRouter } from 'vue-router'
const router = useRouter()


// 表单引用和响应式数据
const memberFormRef = ref();
let memberForm = reactive({
  name: "",
  phone: "",
  email: "",
  id_card: "",
  address: "",
  register_time: null,
  level_name: 1,
  points_balance: 1
});

// 表单验证规则配置
const memberFormRules = reactive({
  name: [
    { required: true, message: "请输入会员名称", trigger: "blur" },
  ],
  phone: [
    { required: true, message: "请输入会员手机号", trigger: "blur" },
  ],
  email: [
    { required: true, message: "请输入会员邮箱", trigger: "blur" },
  ],
  id_card: [
    { required: true, message: "请输入会员身份证号", trigger: "blur" },
  ],
  address: [
    { required: true, message: "请输入会员地址", trigger: "blur" },
  ],
  register_time: [
    { required: true, message: "请选择会员注册时间", trigger: "change" },
  ],
  level_name: [
    { required: true, message: "请选择会员等级", trigger: "change" },
  ],
  points_balance: [
    { required: true, message: "请输入会员积分余额", trigger: "blur" },
  ]
});

// 角色选项配置
const options = [
  { value: 1, label: '普通会员' },
  { value: 2, label: '黄金会员' },
  { value: 3, label: '钻石会员' },

]


/**
 * 提交表单处理函数
 */
const submitForm = () => {
  // 执行表单验证
  memberFormRef.value.validate(async (valid) => {
    if (valid) {
      // 格式化时间
      memberForm.register_time = dayjs(memberForm.register_time).format('YYYY-MM-DD HH:mm:ss');
      console.log(memberForm);
      const res = await axios.post('http://localhost:3000/adminapi/member/add', memberForm)
      console.log(res.data);
      if (res.data.ActionType === "OK") {
        ElMessage.success('更新成功')
        // 跳转到用户列表页
        router.push('/member-manage/memberlist')
      } else {
        ElMessage.error('更新失败')
      }

    }
  })
}
</script>

<style lang="scss" scoped>
/* 表单顶部间距调整 */
.demo-memberForm {
  margin-top: 50px;
}
</style>

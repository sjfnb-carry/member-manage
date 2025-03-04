<template>
  <div>
    <!-- 用户管理卡片 -->
    <el-card>
      <el-page-header content="用户列表" icon="" title="用户管理" />

      <!-- 搜索框 -->
      <el-input v-model="searchQuery" placeholder="输入用户名或角色搜索" style="padding-top: 20px;width: 30%;" />

      <!-- 用户表格 -->
      <el-table :data="filteredTableData" style="width: 100%">
        <el-table-column prop="username" label="用户名" />
        <el-table-column label="头像">
          <template #default="scope">
            <!-- 动态显示用户头像 -->
            <el-avatar :size="50" :src="scope.row.avatar ? 'http://localhost:3000' + scope.row.avatar : circleUrl" />
          </template>
        </el-table-column>

        <!-- 角色标签显示 -->
        <el-table-column label="角色">
          <template #default="scope">
            <el-tag v-if="scope.row.role === 1" type="danger">管理员</el-tag>
            <el-tag v-else type="success">普通用户</el-tag>
          </template>
        </el-table-column>

        <!-- 操作列 -->
        <el-table-column label="操作">
          <template #default="scope">
            <el-button circle :icon="Edit" @click="handleEdit(scope.row)"></el-button>

            <!-- 删除确认对话框 -->
            <el-popconfirm title="确认删除？" @confirm="handleDelete(scope.row)">
              <template #reference>
                <el-button circle :icon="Delete" type="danger"></el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 编辑用户对话框 -->
    <el-dialog v-model="dialogVisible" title="编辑用户" width="50%">
      <el-form ref="userFormRef" :model="userForm" :rules="userFormRules" label-width="120px">
        <!-- 用户名字段 -->
        <el-form-item label="用户名" prop="username">
          <el-input v-model="userForm.username" />
        </el-form-item>

        <!-- 密码字段 -->
        <el-form-item label="密码" prop="password">
          <el-input v-model="userForm.password" />
        </el-form-item>

        <!-- 角色选择 -->
        <el-form-item label="角色" prop="role">
          <el-select v-model="userForm.role" placeholder="选择角色">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>

        <!-- 简介输入 -->
        <el-form-item label="个人简介" prop="introduction">
          <el-input type="textarea" v-model="userForm.introduction" />
        </el-form-item>
      </el-form>

      <!-- 对话框操作 -->
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleEditConfirm">确认</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import { Delete, Edit } from '@element-plus/icons-vue';

// 表格数据
const tableData = ref([]);
// 默认头像
const circleUrl = ref('https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png');
// 对话框显示状态
const dialogVisible = ref(false);

// 表单相关
const userFormRef = ref();
const userForm = ref({
  username: "",
  password: "",
  role: 2,
  introduction: "",
});
// 表单验证规则
const userFormRules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  role: [{ required: true, message: '请选择角色', trigger: 'blur' }],
  introduction: [{ required: true, message: '请输入简介', trigger: 'blur' }]
};
// 角色选项
const options = [
  { label: '管理员', value: 1 },
  { label: '普通用户', value: 2 }
];
// 搜索查询
const searchQuery = ref('');

// 生命周期钩子
onMounted(() => {
  getTableData();
});

// 获取用户列表
const getTableData = async () => {
  const res = await axios.get("http://localhost:3000/adminapi/user/list");
  tableData.value = res.data.data;
  console.log(res.data);
};

// 过滤后的表格数据，支持根据用户名或角色搜索
const filteredTableData = computed(() => {
  // 过滤表格数据中的每一项
  return tableData.value.filter(item =>
    // 检查用户名是否包含搜索关键词
    item.username.includes(searchQuery.value.toLocaleLowerCase()) ||
    // 检查角色是否为管理员，并且搜索关键词为'管理员'
    (item.role === 1 && searchQuery.value.toLowerCase() === '管理员') ||
    // 检查角色是否为普通用户，并且搜索关键词为'普通用户'
    (item.role === 2 && searchQuery.value.toLowerCase() === '普通用户')
  );
});

// 编辑用户
const handleEdit = async (data) => {
  dialogVisible.value = true;
  const res = await axios.get(`http://localhost:3000/adminapi/user/list/${data.id}`);
  userForm.value = res.data.data;
};

// 提交编辑
const handleEditConfirm = async () => {
  userFormRef.value.validate(async (valid) => {
    if (valid) {
      await axios.put(`http://localhost:3000/adminapi/user/list/${userForm.value.id}`, userForm.value);
      dialogVisible.value = false;
      getTableData();
    }
  });
};

// 删除用户
const handleDelete = async (data) => {
  await axios.delete(`http://localhost:3000/adminapi/user/list/${data.id}`);
  getTableData();
};
</script>

<style lang="scss" scoped>
.el-table {
  margin-top: 50px;
}
</style>

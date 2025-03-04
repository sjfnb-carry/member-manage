<template>
  <div>

    <el-card>
      <el-page-header content="会员列表" icon="" title="会员用户管理" />
      <!-- 搜索框 -->
      <el-input v-model="searchQuery" placeholder="输入会员名或会员等级" style="padding-top: 20px;width: 30%;" />

      <el-table :data="filteredTableData" style="width: 100%">
        <el-table-column prop="name" label="会员名" />
        <el-table-column prop="phone" label="手机号" />
        <el-table-column prop="email" label="电子邮件" />
        <el-table-column prop="id_card" label="会员卡号" />
        <el-table-column prop="address" label="地址" />
        <el-table-column prop="register_time" label="注册时间" />
        <el-table-column label="会员等级">
          <template #default="scope">
            <el-tag v-if="scope.row.level_name === 1" type="danger">普通会员</el-tag>
            <el-tag v-else-if="scope.row.level_name === 2" type="success">黄金会员</el-tag>
            <el-tag v-else-if="scope.row.level_name === 3" type="warning">钻石会员</el-tag>
            <el-tag v-else>其它会员</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="points_balance" label="积分余额" />


        <el-table-column label="操作">
          <template #default="scope">
            <el-button circle :icon="Edit" @click="handleEdit(scope.row)"></el-button>

            <el-popconfirm title="确认删除？" @confirm="handleDelete(scope.row)">
              <template #reference>
                <el-button circle :icon="Delete" type="danger"></el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-card>


    <el-dialog v-model="dialogVisible" title="编辑活动" width="50%">
      <el-form ref="memberFormRef" :model="memberForm" :rules="memberFormRules" label-width="120px">

        <el-form-item label="会员名" prop=" name">
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
        <el-form-item label="积分余额" prop="points_balance">
          <el-input v-model="memberForm.points_balance" />
        </el-form-item>
      </el-form>

      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleEditConfirm">确认</el-button>
      </template>

    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import dayjs from 'dayjs';
import axios from 'axios';
import { Edit, Delete } from '@element-plus/icons-vue';

// 表格数据
const tableData = ref([]);

// 对话框显示状态
const dialogVisible = ref(false);

// 表单相关
const memberFormRef = ref();
let memberForm = ref({
  name: "",
  phone: "",
  email: "",
  id_card: "",
  address: "",
  register_time: null,
  level_name: 1,
  points_balance: 1
});
// 表单验证规则
const memberFormRules = {
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
};
const options = [
  { value: 1, label: '普通会员' },
  { value: 2, label: '黄金会员' },
  { value: 3, label: '钻石会员' },
]

const searchQuery = ref('')

// 生命周期钩子
onMounted(() => {
  getTableData();
});

// 获取用户列表
const getTableData = async () => {
  let res = await axios.get("http://localhost:3000/adminapi/member/list");
  // 格式化日期
  res.data.data.map((item) => {
    item.register_time = dayjs(item.register_time).format('YYYY-MM-DD');
  });
  tableData.value = res.data.data;
  console.log(res.data);
};

// 过滤表格数据
const filteredTableData = computed(() => {
  // 过滤表格数据中的每一项
  return tableData.value.filter(item =>
    item.name.includes(searchQuery.value.toLocaleLowerCase()) ||
    (item.level_name === 1 && searchQuery.value.toLowerCase() === '普通会员') ||
    (item.level_name === 2 && searchQuery.value.toLowerCase() === '黄金会员') ||
    (item.level_name === 3 && searchQuery.value.toLowerCase() === '钻石会员')
  )
});

// 编辑用户
const handleEdit = async (data) => {
  dialogVisible.value = true;
  const res = await axios.get(`http://localhost:3000/adminapi/member/list/${data.member_id}`);
  // console.log(res.data);
  memberForm.value = res.data.data;
};

// 提交编辑
const handleEditConfirm = async () => {
  memberFormRef.value.validate(async (valid) => {
    if (valid) {
      // 格式化时间
      memberForm.value.register_time = dayjs(memberForm.value.register_time).format('YYYY-MM-DD ');
      await axios.put(`http://localhost:3000/adminapi/member/list/${memberForm.value.member_id}`, memberForm.value);
      dialogVisible.value = false;
      getTableData();
    }
  });
};

// 删除用户
const handleDelete = async (data) => {
  await axios.delete(`http://localhost:3000/adminapi/member/list/${data.member_id}`);
  getTableData();
};
</script>

<style lang="scss" scoped>
.el-table {
  margin-top: 50px;
}
</style>

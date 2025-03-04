<template>
  <div>

    <el-card>
      <el-page-header content="等级列表" icon="" title="等级管理" />


      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="会员等级">
          <template #default="scope">
            <el-tag v-if="scope.row.level_name === 1">普通会员</el-tag>
            <el-tag v-else-if="scope.row.level_name === 2">黄金会员</el-tag>
            <el-tag v-else-if="scope.row.level_name === 3">钻石会员</el-tag>
            <el-tag v-else>其它会员</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="min_points" label="最少积分" />
        <el-table-column prop="max_points" label="最大积分" />
        <el-table-column prop="discount_rate" label="折扣率" />


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
      <el-form ref="levelFormRef" :model="levelForm" :rules="levelFormRules" label-width="120px">

        <el-form-item label="会员等级" prop="level_name">
          <el-select v-model="levelForm.level_name" placeholder="请选择会员等级">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="最小积分" prop="min_points">
          <el-input v-model="levelForm.min_points" />
        </el-form-item>
        <el-form-item label="最大积分" prop="max_points">
          <el-input v-model="levelForm.max_points" />
        </el-form-item>
        <el-form-item label="折扣率" prop="discount_rate">
          <el-input v-model="levelForm.discount_rate" />
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
import { ref, onMounted, reactive } from 'vue';
import axios from 'axios';
import { Edit, Delete } from '@element-plus/icons-vue';

// 表格数据
const tableData = ref([]);

// 对话框显示状态
const dialogVisible = ref(false);

// 表单相关
const levelFormRef = ref();
let levelForm = ref({
  level_name: null,
  min_points: null,
  max_points: null,
  discount_rate: null,
});
// 表单验证规则
const levelFormRules = reactive({
  level_name: [
    { required: true, message: "请定义等级", trigger: "blur" },
  ],
  min_points: [
    { required: true, message: "请输入最小积分", trigger: "blur" },
  ],
  max_points: [
    { required: true, message: "请输入最大积分", trigger: "blur" },
  ],
  discount_rate: [
    { required: true, message: "请输入折扣率", trigger: "blur" },
  ],
});
const options = [
  { value: 1, label: '普通会员' },
  { value: 2, label: '黄金会员' },
  { value: 3, label: '钻石会员' },
  { value: 4, label: '其它会员' },
]



// 生命周期钩子
onMounted(() => {
  getTableData();
});

// 获取用户列表
const getTableData = async () => {
  let res = await axios.get("http://localhost:3000/adminapi/memberlevel/list");
  tableData.value = res.data.data;
  console.log(res.data);
};



// 编辑用户
const handleEdit = async (data) => {
  dialogVisible.value = true;
  console.log(data.level_id);

  const res = await axios.get(`http://localhost:3000/adminapi/memberlevel/list/${data.level_id}`);
  // console.log(res.data);
  levelForm.value = res.data.data;
};

// 提交编辑
const handleEditConfirm = async () => {
  levelFormRef.value.validate(async (valid) => {
    if (valid) {
      console.log(levelForm.value);
      await axios.put(`http://localhost:3000/adminapi/memberlevel/list/${levelForm.value.level_id}`, levelForm.value);
      dialogVisible.value = false;
      getTableData();
    }
  });
};

// 删除用户
const handleDelete = async (data) => {
  await axios.delete(`http://localhost:3000/adminapi/memberlevel/list/${data.level_id}`);
  getTableData();
};
</script>

<style lang="scss" scoped>
.el-table {
  margin-top: 50px;
}
</style>

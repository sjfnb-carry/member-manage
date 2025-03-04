<template>
  <div>

    <el-card>
      <el-page-header content="活动列表" icon="" title="会员活动管理" />

      <!-- 搜索框 -->
      <el-input v-model="searchQuery" placeholder="输入活动名或活动状态" style="padding-top: 20px;width: 30%;" />

      <el-table :data="filteredTableData" style="width: 100%">
        <el-table-column prop="activity_name" label="活动名称" />
        <el-table-column prop="activity_description" label="活动介绍" />
        <el-table-column prop="start_time" label="活动开始时间" />
        <el-table-column prop="end_time" label="活动结束时间" />

        <el-table-column label="活动图片">
          <template #default="scope">
            <el-image style="width: 100px; height: 100px"
              :src="scope.row.activity_picture ? 'http://localhost:3000' + scope.row.activity_picture : circleUrl" />
          </template>
        </el-table-column>

        <el-table-column label="活动状态">
          <template #default="scope">
            <el-tag v-if="scope.row.status === 1" type="danger">正在进行</el-tag>
            <el-tag v-else type="success">已结束</el-tag>
          </template>
        </el-table-column>


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
      <el-form ref="activityFormRef" :model="activityForm" :rules="activityFormRules" label-width="120px">

        <el-form-item label="活动名称" prop=" activity_name">
          <el-input v-model="activityForm.activity_name" />
        </el-form-item>


        <el-form-item label="活动介绍" prop=" activity_description">
          <el-input type="textarea" v-model="activityForm.activity_description" />
        </el-form-item>

        <el-form-item label="活动开始时间" prop="start_time">
          <el-date-picker v-model="activityForm.start_time" type="date" placeholder="请选择时间" />
        </el-form-item>

        <el-form-item label="活动结束时间" prop="end_time">
          <el-date-picker v-model="activityForm.end_time" type="date" placeholder="请选择时间" />
        </el-form-item>

        <el-form-item label="活动状态" prop="status">
          <el-select v-model="activityForm.status" placeholder="选择状态" style="width: 100%">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
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
// 默认头像
const circleUrl = ref('https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png');
// 对话框显示状态
const dialogVisible = ref(false);

// 表单相关
const activityFormRef = ref();
let activityForm = ref({
  activity_name: "",
  activity_description: "",
  status: 1,
  start_time: null,
  end_time: null,
  activity_picture: "",
});
// 表单验证规则
const activityFormRules = {
  activity_name: [
    { required: true, message: "请输入活动名称", trigger: "blur" },
  ],
  activity_description: [
    { required: true, message: "请输入活动内容", trigger: "blur" },
  ],
  status: [
    { required: true, message: "请选择活动状态", trigger: "blur" },
  ],
  start_time: [
    { required: true, message: "请选择活动开始时间", trigger: "blur" },
  ],
  end_time: [
    { required: true, message: "请选择活动结束时间", trigger: "blur" },
  ],
  activity_picture: [
    { required: true, message: "请上传活动图片", trigger: "blur" },
  ],
};
const options = [
  { label: '正在进行', value: 1 },
  { label: '已结束', value: 2 }
]

// 搜索查询
const searchQuery = ref('');

// 生命周期钩子
onMounted(() => {
  getTableData();
});

// 获取活动列表
const getTableData = async () => {
  let res = await axios.get("http://localhost:3000/adminapi/activity/list");
  // 格式化日期
  res.data.data.map((item) => {
    item.start_time = dayjs(item.start_time).format('YYYY-MM-DD');
    item.end_time = dayjs(item.end_time).format('YYYY-MM-DD');
  });
  tableData.value = res.data.data;
  console.log(res.data);
};

// 过滤后的表格数据
const filteredTableData = computed(() => {
  // 过滤表格数据中的每一项
  return tableData.value.filter(item =>
    item.activity_name.includes(searchQuery.value.toLocaleLowerCase()) ||
    (item.status === 1 && searchQuery.value.toLowerCase() === '正在进行') ||
    (item.status === 2 && searchQuery.value.toLowerCase() === '已结束')
  );
});

// 编辑活动
const handleEdit = async (data) => {
  dialogVisible.value = true;
  const res = await axios.get(`http://localhost:3000/adminapi/activity/list/${data.activity_id}`);
  // console.log(res.data);

  activityForm.value = res.data.data;
};

// 提交编辑
const handleEditConfirm = async () => {
  activityFormRef.value.validate(async (valid) => {
    if (valid) {
      // 格式化时间
      activityForm.value.start_time = dayjs(activityForm.value.start_time).format('YYYY-MM-DD ');
      activityForm.value.end_time = dayjs(activityForm.value.end_time).format('YYYY-MM-DD');
      await axios.put(`http://localhost:3000/adminapi/activity/list/${activityForm.value.activity_id}`, activityForm.value);
      dialogVisible.value = false;
      getTableData();
    }
  });
};

// 删除活动
const handleDelete = async (data) => {
  await axios.delete(`http://localhost:3000/adminapi/activity/list/${data.activity_id}`);
  getTableData();
};
</script>

<style lang="scss" scoped>
.el-table {
  margin-top: 50px;
}
</style>

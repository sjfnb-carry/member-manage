<template>
  <div>
    <el-page-header content="添加活动" icon="" title="会员活动管理" />

    <el-form ref="activityFormRef" style="max-width: 600px" :model="activityForm" :rules="activityFormRules"
      label-width="120px" class="demo-activityForm" status-icon>


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

      <el-form-item label="活动图片" prop=" activity_picture">
        <!-- 自定义上传组件，监听头像更新事件 -->
        <UpLoad :avatar="activityForm.activity_picture" @update:avatar="handleChange"></UpLoad>
      </el-form-item>

      <!-- 表单提交按钮 -->
      <el-form-item>
        <el-button type="primary" @click="submitForm()">提交活动</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script setup>
import UpLoad from '@/components/upload/UpLoad.vue';
import upload from '@/util/upload';
import dayjs from 'dayjs';
import { ElMessage } from 'element-plus';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router'

const router = useRouter()


const activityFormRef = ref()
const activityForm = reactive({
  activity_name: "",
  activity_description: "",
  status: 1,
  start_time: null,
  end_time: null,
  activity_picture: "",
  file: null
})
const activityFormRules = reactive({
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
});
const options = [
  { label: '正在进行', value: 1 },
  { label: '已结束', value: 2 }
]

const handleChange = (file) => {
  // 生成预览URL并更新表单
  activityForm.activity_picture = URL.createObjectURL(file)
  // 保存原始文件用于后续上传
  activityForm.file = file
}
const submitForm = () => {
  // 执行表单验证
  activityFormRef.value.validate(async (valid) => {
    if (valid) {
      console.log(activityForm);
      // 格式化 start_time 和 end_time
      activityForm.start_time = dayjs(activityForm.start_time).format('YYYY-MM-DD');
      activityForm.end_time = dayjs(activityForm.end_time).format('YYYY-MM-DD');
      // 调用封装的upload方法提交数据到后台
      await upload('http://localhost:3000/adminapi/activity/add', activityForm)
        .then(res => {
          if (res.data.ActionType === "OK") {
            console.log(res.data);

            ElMessage.success('更新成功')
            // 跳转到用户列表页
            router.push('/activity-manage/activitylist')
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
.demo-activityForm {
  margin-top: 50px;
}
</style>

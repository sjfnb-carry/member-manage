<template>
  <div>
    <el-page-header content="添加等级" icon="" title="会员等级管理" />

    <el-form ref="levelFormRef" style="max-width: 600px" :model="levelForm" :rules="levelFormRules" label-width="120px"
      class="demo-levelForm" status-icon>

      <el-form-item label="等级名称" prop="level_name">
        <el-input v-model="levelForm.level_name" />
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

      <!-- 表单提交按钮 -->
      <el-form-item>
        <el-button type="primary" @click="submitForm()">提交等级</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script setup>

import axios from 'axios';
import { ElMessage } from 'element-plus';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router'

const router = useRouter()


const levelFormRef = ref()
const levelForm = reactive({
  level_name: null,
  min_points: null,
  max_points: null,
  discount_rate: null,
})
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


const submitForm = () => {
  // 执行表单验证
  levelFormRef.value.validate(async (valid) => {
    if (valid) {
      console.log(levelForm);
      const res = await axios.post('http://localhost:3000/adminapi/memberlevel/add', levelForm)
      if (res.data.ActionType === "OK") {
        ElMessage.success('添加成功')
        console.log(res.data);

        // 跳转到等级列表页
        router.push('/memberlevel-manage/levellist')
      } else {
        ElMessage.error('添加失败')
      }
    }

  })
}
</script>

<style lang="scss" scoped>
/* 表单顶部间距调整 */
.demo-levelForm {
  margin-top: 50px;
}
</style>

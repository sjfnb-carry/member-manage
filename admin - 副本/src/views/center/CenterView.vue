<template>
  <div>
    <el-page-header content="个人中心" icon="" title="超市会员管理系统" />

    <el-row :gutter="20" class="el-row">

      <el-col :span="8">
        <el-card class="box-card">
          <el-avatar :size="100" :src="avatarUrl" />
          <h3>{{ userInfoStore.userInfo.username }}</h3>
          <h3>{{ userInfoStore.userInfo.role === 1 ? '管理员' : '普通用户' }}</h3>
        </el-card>
      </el-col>

      <el-col :span="16">
        <el-card>

          <template #header>
            <div class="card-header">
              <span>个人信息</span>
            </div>
          </template>

          <el-form ref="userFormRef" style="max-width: 600px" :model="userForm" :rules="userFormRules"
            label-width="120px" class="demo-userForm" status-icon>

            <el-form-item label="用户名" prop="username">
              <el-input v-model="userForm.username" />
            </el-form-item>
            <el-form-item label="性别" prop="gender">
              <el-select v-model="userForm.gender" placeholder="选择性别" style="width: 100%">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item label="个人简介" prop="introduction">
              <el-input type="textarea" v-model="userForm.introduction" />
            </el-form-item>

            <el-form-item label="头像" prop="avatar">
              <UpLoad :avatar="userForm.avatar" @update:avatar="handleChange"></UpLoad>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="submitForm()">更新</el-button>
            </el-form-item>


          </el-form>

        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { useUserInfoStore } from '@/stores/userInfo';
import { computed, ref, reactive } from 'vue'
import UpLoad from '@/components/upload/UpLoad.vue';
import upload from '../../util/upload'
import { ElMessage } from 'element-plus';
const userInfoStore = useUserInfoStore()
const { username, gender, introduction, avatar } = userInfoStore.userInfo

const userForm = reactive({
  username,
  gender: gender === 1 ? '男' : gender === 2 ? '女' : '保密',
  introduction,
  avatar,
  file: null,
})
const userFormRules = reactive({
  username: [
    { required: true, message: '请输入名字', trigger: 'blur' },
  ],
  gender: [
    { required: true, message: '请选择性别', trigger: 'blur' },
  ],
  introduction: [
    { required: true, message: '请输入简介', trigger: 'blur' },
  ],
  avatar: [
    { required: true, message: '请上传头像', trigger: 'blur' },
  ],

})
const userFormRef = ref()

const options = reactive([
  {
    value: '1',
    label: '男',
  },
  {
    value: '2',
    label: '女',
  },
  {
    value: '0',
    label: '保密',
  },
])

// 每次选择完图片之后的回调
const handleChange = (file) => {
  // console.log(file.raw);
  // 将用户表单中的头像属性设置为创建的Object URL
  // 使用URL.createObjectURL(file.raw) 从文件中创建一个可以预览的图像URL

  userForm.avatar = URL.createObjectURL(file)
  // console.log(userForm.avatar); blob:http://localhost:5173/....

  userForm.file = file

}

// 更新提交
const submitForm = () => {
  userFormRef.value.validate(async (valid) => {
    if (valid) {
      // console.log(userForm);
      await upload('http://localhost:3000/adminapi/user/upload', userForm).then(res => {
        console.log(res.data)
        if (res.data.ActionType === "OK") {
          userInfoStore.changeUserInfo(res.data.data)
          ElMessage.success('更新成功')
        }
      }).catch(err => console.error('请求失败:', err))
    }

  })
}


const avatarUrl = computed(() => {
  // 如果用户信息中的头像属性存在，则使用该属性值
  // 否则，使用默认的头像URL
  return userInfoStore.userInfo.avatar ? 'http://localhost:3000' + userInfoStore.userInfo.avatar : `https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png`
})

</script>

<style lang="scss" scoped>
.el-row {
  margin-top: 20px;

  .box-card {
    text-align: center;
  }
}

:deep(.avatar-uploader .el-upload) {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

:deep(.avatar-uploader .el-upload:hover) {
  border-color: var(--el-color-primary);
}

:deep(.el-icon.avatar-uploader-icon) {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
}
</style>

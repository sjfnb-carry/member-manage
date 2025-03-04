<template>
  <div>
    <el-page-header content="首页" icon="" title="超市会员管理系统" />
    <el-card class="box-card">
      <el-row>
        <el-col :span="4">
          <el-avatar :size="150" :src="avatarUrl" />
        </el-col>

        <el-col :span="20">
          <h3 style="line-height: 120px;"> {{ welcomeText + userInfoStore.userInfo.username }} </h3>
        </el-col>
      </el-row>
    </el-card>

    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>会员活动</span>
        </div>
      </template>
      <el-carousel v-if="loopList.length" :interval="4000" type="card" height="400px">
        <el-carousel-item v-for="item in loopList" :key="item.activity_id">
          <div
            :style="{ backgroundImage: `url(http://localhost:3000/${item.activity_picture})`, backgroundSize: 'cover' }">
            <h3>{{ item.activity_name }}</h3>
          </div>
        </el-carousel-item>
      </el-carousel>
    </el-card>
  </div>
</template>

<script setup>

import { useUserInfoStore } from '@/stores/userInfo';
import axios from 'axios';
import dayjs from 'dayjs';
import { computed, onMounted, ref } from 'vue'

const userInfoStore = useUserInfoStore()
const loopList = ref([])

// 计算属性：获取用户头像URL
const avatarUrl = computed(() => {
  // 如果用户信息中的头像属性存在，则使用该属性值
  // 否则，使用默认的头像URL
  return userInfoStore.userInfo.avatar ? 'http://localhost:3000' + userInfoStore.userInfo.avatar : `https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png`
})

const welcomeText = computed(() => {
  const hour = new Date().getHours()
  return hour < 12 ? '早上好，尊敬的 ' : hour < 18 ? '下午好，尊敬的 ' : '晚上好，尊敬的 '
})


onMounted(() => {
  getTableData();
});

// 获取用户列表
const getTableData = async () => {
  let res = await axios.get("http://localhost:3000/adminapi/activity/list");
  // 格式化日期
  res.data.data.map((item) => {
    item.start_time = dayjs(item.start_time).format('YYYY-MM-DD');
    item.end_time = dayjs(item.end_time).format('YYYY-MM-DD');
  });
  loopList.value = res.data.data;
  console.log(loopList.value);


};
</script>

<style lang="scss" scoped>
.box-card {
  margin-top: 50px;
}

.el-carousel__item h3 {
  color: white;
  opacity: 0.75;
  line-height: 400px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>

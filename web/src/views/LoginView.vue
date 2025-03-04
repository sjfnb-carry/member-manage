<template>
  <div>
    <!-- 粒子背景组件 -->
    <Particles id="tsparticles" class="login__particles" :particlesInit="particlesInit" :options="options" />


    <!-- 登录表单容器 -->
    <div class="formContainer">
      <h3>超市会员管理系统</h3>

      <!-- Element Plus 表单组件 -->
      <el-form ref="loginFormRef" style="max-width: 600px" :model="loginForm" status-icon :rules="loginRules"
        label-width="80px" class="loginform">
        <!-- 用户名输入项 -->
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginForm.username" autocomplete="off" />
        </el-form-item>

        <!-- 密码输入项 -->
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginForm.password" type="password" autocomplete="off" />
        </el-form-item>

        <!-- 提交按钮 -->
        <el-form-item>
          <el-button type="primary" @click="submitForm()">登陆</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { loadSlim } from "tsparticles-slim";
import axios from 'axios'
import { ElMessage } from 'element-plus'
import { useUserInfoStore } from '@/stores/userInfo'
import { useGetterRouterStore } from '@/stores/getterRouter'
const GetterRouterStore = useGetterRouterStore()
const userInfoStore = useUserInfoStore()

// 响应式表单数据对象
const loginForm = reactive({
  username: '',
  password: ''
})

// 表单引用（用于触发表单验证）
const loginFormRef = ref()

// 表单验证规则
const loginRules = reactive({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 10, message: '长度在 6 到 10 个字符', trigger: 'blur' }
  ]
})

// 路由实例
const router = useRouter()

// 表单提交处理
const submitForm = () => {
  // 执行表单验证
  loginFormRef.value.validate(async (valid) => {
    if (valid) {
      // 验证通过后的操作
      // console.log(loginForm)
      try {
        const res = await axios.post('http://localhost:3000/adminapi/user/login', loginForm)
        if (res.data.ActionType === "ok") {
          userInfoStore.changeUserInfo(res.data.data)
          // 更改路由状态为false，退出重新登陆时 重新获取路由
          GetterRouterStore.changeGetterRouter(false)
          // 跳转到首页
          router.push('/index')
        } else {
          ElMessage.error('用户名密码不匹配.')
        }
      } catch (error) {
        console.log(error);
      }
    }

  })
}

// Particles.js 配置选项

const particlesInit = async engine => {
  // await loadFull(engine);
  await loadSlim(engine);
}
const options = {
  fpsLimit: 60,
  interactivity: {
    detectsOn: 'canvas',
    events: {
      onClick: { // 开启鼠标点击的效果
        enable: true,
        mode: 'push'
      },
      onHover: { // 开启鼠标悬浮的效果(线条跟着鼠标移动)
        enable: true,
        mode: 'grab'
      },
      resize: true
    },
    modes: { // 配置动画效果
      bubble: {
        distance: 400,
        duration: 2,
        opacity: 0.8,
        size: 40
      },
      push: {
        quantity: 4
      },
      grab: {
        distance: 200,
        duration: 0.4
      },
      attract: { // 鼠标悬浮时，集中于一点，鼠标移开时释放产生涟漪效果
        distance: 200,
        duration: 0.4,
        factor: 5
      }
    }
  },
  particles: {
    color: {
      value: '#19CAAD' // 粒子点的颜色
    },
    links: {
      color: '#E3EDCD', // 线条颜色
      distance: 150,//线条距离
      enable: true,
      opacity: 0.4, // 不透明度
      width: 1.2 // 线条宽度
    },
    collisions: {
      enable: true
    },
    move: {
      attract: { enable: false, rotateX: 600, rotateY: 1200 },
      bounce: false,
      direction: 'none',
      enable: true,
      out_mode: 'out',
      random: false,
      speed: 0.5, // 移动速度
      straight: false
    },
    number: {
      density: {
        enable: true,
        value_area: 800
      },
      value: 80//粒子数
    },
    opacity: {//粒子透明度
      value: 0.7
    },
    shape: {//粒子样式
      type: 'star'
    },
    size: {//粒子大小
      random: true,
      value: 3
    }
  },
  detectRetina: true
}

</script>

<style lang="scss" scoped>
.formContainer {
  width: 500px;
  height: 300px;
  position: fixed;
  left: 75%;
  top: 50%;
  transform: translate(-50%, -50%);
  /* 居中定位 */
  background: rgba($color: #000000, $alpha: 0.7);
  /* 半透明黑色背景 */
  color: white;
  text-align: center;
  padding: 20px;

  h3 {
    font-size: 30px;
    /* 标题字体大小 */
  }

  .loginform {
    margin-top: 20px;
    /* 表单上边距 */
  }
}

.login__particles {
  height: 100%;
  width: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url('@/assets/0001.png');
  opacity: 1;
  position: fixed;
  pointer-events: none;
}

/* 深度选择器修改子组件样式 */
:deep(.el-form-item__label) {
  color: white;
  /* 表单标签文字颜色 */
}
</style>

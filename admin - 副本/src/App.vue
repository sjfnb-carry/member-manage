<template>
  <RouterView />
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>


<style scoped>
* {
  margin: 0;
  padding: 0;
}

/* 自定义滚动条样式 */
::-webkit-scrollbar {
  width: 5px;
  height: 5px;
  position: absolute;
}

/* 自定义滚动条滑块的样式 */
::-webkit-scrollbar-thumb {
  background: #1890ff;
}

/* 自定义滚动条轨道的样式 */
::-webkit-scrollbar-track {
  background: #ddd;
}
</style>

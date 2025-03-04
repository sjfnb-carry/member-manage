<template>
  <div>
    <el-upload class="avatar-uploader" action=" " :show-file-list="false" :auto-upload="false"
      :on-change="handleChange">
      <img v-if="props.avatar" :src="uploadAvatar" class="avatar" />
      <el-icon v-else class="avatar-uploader-icon">
        <Plus />
      </el-icon>
    </el-upload>
  </div>
</template>

<script setup>
import { Plus } from '@element-plus/icons-vue'
import { computed } from 'vue'
const emit = defineEmits(['update:avatar'])
const props = defineProps({
  avatar: String
})

// 预览更新图片
const uploadAvatar = computed(() => {
  return props.avatar.includes('blob') ? props.avatar : `http://localhost:3000` + props.avatar
})

// 每次选择完图片之后的回调
const handleChange = (file) => {
  emit('update:avatar', file.raw)

}
</script>

<style lang="scss" scoped>
:deep(.el-upload) {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

:deep(.el-upload:hover) {
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

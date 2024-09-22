<script setup lang="ts">
import { userUpdateAvatarService } from '@/api/user'
import { useUserStore } from '@/stores'
import type { UploadFile } from 'element-plus'
import { ref } from 'vue'

const { user, userGetInfo } = useUserStore()
const imageUrl = ref(user?.user_pic)
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif']
const MAX_FILE_SIZE = 4 * 1024 * 1024
const onSelectFile = (uploadFile: UploadFile) => {
  if (!ALLOWED_TYPES.includes(uploadFile.raw?.type as string)) {
    ElMessage.error('Avatar must be JPG/PNG/GIF format!')
    return
  } else if (uploadFile.raw?.size && uploadFile.raw?.size > MAX_FILE_SIZE) {
    ElMessage.error('Avatar size can not exceed 4MB!')
    return
  }
  const reader = new FileReader()
  reader.readAsDataURL(uploadFile.raw as Blob)
  reader.onload = () => (imageUrl.value = reader.result as string)
}
const loading = ref(false)
const handleSubmit = async () => {
  if (imageUrl.value === user?.user_pic) {
    ElMessage.warning('No changes are made!')
    return
  }
  loading.value = true
  await userUpdateAvatarService(imageUrl.value as string)
  ElMessage.success('Update Successful')
  userGetInfo()
  loading.value = false
}
</script>

<template>
  <el-upload
    class="avatar-uploader"
    :show-file-list="false"
    :auto-upload="false"
    :on-change="onSelectFile"
  >
    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
    <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
  </el-upload>
  <el-button
    style="margin-top: 10px"
    type="primary"
    :loading="loading"
    @click="handleSubmit"
  >
    Submit
  </el-button>
</template>

<style scoped lang="scss">
.avatar-uploader {
  ::v-deep {
    .avatar {
      width: 200px;
      height: 200px;
      display: block;
    }
    .el-upload {
      zoom: 1.5;
      border: 1px dashed var(--el-border-color);
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);
      @media (max-width: 768px) {
        zoom: 1;
      }
    }
    .el-upload:hover {
      border-color: var(--el-color-primary);
    }
    .el-icon.avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      text-align: center;
    }
  }
}
</style>

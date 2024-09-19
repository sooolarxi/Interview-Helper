<script setup lang="ts">
import { userUpdateInfoService } from '@/api/user'
import type { userInfo } from '@/api/user/type'
import { useDeviceStore, useUserStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

const userStore = useUserStore()
const { user } = storeToRefs(userStore)
const { isMobile } = storeToRefs(useDeviceStore())

const formRef = ref()
const formModel = ref<userInfo>({
  id: user.value?.id as number,
  nickname: user.value?.nickname || '',
  email: user.value?.email || ''
})
const rules = {
  nickname: [
    { required: true, message: 'Please enter a nickname', trigger: 'blur' },
    {
      pattern: /^\S{1,10}$/,
      message: 'Nickname must be 1-10 non-space characters',
      trigger: 'blur'
    }
  ],
  email: [
    { required: true, message: 'Please enter an email', trigger: 'blur' },
    {
      pattern: /^[^\s@]+@[^\s@]+\.com$/,
      message: 'Email must be a valid email address',
      trigger: 'blur'
    }
  ]
}

const handleSubmit = async () => {
  try {
    await formRef.value.validate()
  } catch (error) {
    return
  }
  await userUpdateInfoService(formModel.value)
  ElMessage.success('Update Successful')
  userStore.userGetInfo()
}
</script>

<template>
  <el-form
    ref="formRef"
    :model="formModel"
    :rules="rules"
    label-width="80px"
    :label-position="isMobile ? 'top' : ''"
    size="large"
    hide-required-asterisk
  >
    <el-form-item label="Username" v-if="user">
      <el-input v-model="user.username" disabled />
    </el-form-item>
    <el-form-item label="Nickname" prop="nickname">
      <el-input
        v-model="formModel.nickname"
        @blur="formModel.nickname = $event.target.value.trim()"
      />
    </el-form-item>
    <el-form-item label="Email" prop="email">
      <el-input
        placeholder="example@example.com"
        v-model="formModel.email"
        @blur="formModel.email = $event.target.value.trim()"
      />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="handleSubmit">Submit</el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped lang="scss">
.el-form {
  max-width: 50%;
  @media (max-width: 768px) {
    max-width: 100%;
  }
}
</style>

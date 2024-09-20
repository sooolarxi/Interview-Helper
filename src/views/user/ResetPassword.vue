<script setup lang="ts">
import { userUpdatePwdService } from '@/api/user'
import type { userUpdatePwdForm } from '@/api/user/type'
import { useDeviceStore, useUserStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const { isMobile } = storeToRefs(useDeviceStore())

const formRef = ref()
const formModel = ref<userUpdatePwdForm>({
  old_pwd: '',
  new_pwd: '',
  re_pwd: ''
})
const rules = {
  old_pwd: [
    {
      required: true,
      message: 'Please enter your old password',
      trigger: 'blur'
    },
    {
      pattern: /^\S{6,15}$/,
      message: 'Password must be 6-15 non-space characters',
      trigger: 'blur'
    }
  ],
  new_pwd: [
    {
      required: true,
      message: 'Please enter your new password',
      trigger: 'blur'
    },
    {
      pattern: /^\S{6,15}$/,
      message: 'New password must be 6-15 non-space characters',
      trigger: 'blur'
    }
  ],
  re_pwd: [
    {
      required: true,
      message: 'Please confirm your new password again',
      trigger: 'blur'
    },
    {
      validator: (rule: any, value: any, callback: any) => {
        if (value !== formModel.value.new_pwd) {
          callback(new Error('Passwords do not match！'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
}

const { token, user } = storeToRefs(useUserStore())
const router = useRouter()
const handleSubmit = async () => {
  try {
    formRef.value.validate()
  } catch (error) {
    return
  }
  const res = await userUpdatePwdService(formModel.value)
  if (res.code === 1) {
    ElMessage.error('Incorrect old password!')
  } else {
    ElMessage.success('Update Successful')
    token.value = ''
    user.value = undefined
    router.push('/login')
  }
}
const reset = () => formRef.value.resetFields()
</script>

<template>
  <el-form
    ref="formRef"
    :model="formModel"
    :rules="rules"
    label-width="160px"
    :label-position="isMobile ? 'top' : 'left'"
    size="large"
    hide-required-asterisk
  >
    <el-form-item label="Old Password" prop="old_pwd">
      <el-input
        v-model="formModel.old_pwd"
        @blur="formModel.old_pwd = $event.target.value.trim()"
        type="password"
        show-password
      />
    </el-form-item>
    <el-form-item label="New Password" prop="new_pwd">
      <el-input
        v-model="formModel.new_pwd"
        @blur="formModel.new_pwd = $event.target.value.trim()"
        type="password"
        show-password
      />
    </el-form-item>
    <el-form-item label="Confirm New Password" prop="re_pwd">
      <el-input
        v-model="formModel.re_pwd"
        @blur="formModel.re_pwd = $event.target.value.trim()"
        type="password"
        show-password
      />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="handleSubmit">Submit</el-button>
      <el-button @click="reset">Reset</el-button>
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

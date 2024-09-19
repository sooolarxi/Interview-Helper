<script setup lang="ts">
import { userRegService } from '@/api/user'
import { useUserStore } from '@/stores'
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const isLogin = ref(true)
const formRef = ref()
const formModel = ref({
  username: '',
  password: '',
  repassword: ''
})
const rules = {
  username: [
    { required: true, message: 'Please enter a username', trigger: 'blur' },
    {
      pattern: /^\S{5,10}$/,
      message: 'Username must be 5-10 non-space characters',
      trigger: 'blur'
    }
  ],
  password: [
    { required: true, message: 'Please enter a password', trigger: 'blur' },
    {
      pattern: /^\S{6,15}$/,
      message: 'Password must be 6-15 non-space characters',
      trigger: 'blur'
    }
  ],
  repassword: [
    {
      required: true,
      message: 'Please confirm your password again',
      trigger: 'blur'
    },
    {
      validator: (rule: any, value: any, callback: any) => {
        if (value !== formModel.value.password) {
          callback(new Error('Passwords do not match！'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
}

const router = useRouter()
const userStore = useUserStore()
const login = async () => {
  try {
    await formRef.value.validate()
  } catch (error) {
    return
  }
  try {
    await userStore.userLogin(formModel.value)
    ElMessage.success('Login successful')
    router.push('/')
  } catch (error) {
    ElMessage.error('Login failed')
  }
}
const register = async () => {
  try {
    await formRef.value.validate()
  } catch (error) {
    return
  }
  const res = await userRegService(formModel.value)
  if (res.code === 0) {
    ElMessage.success('Registration successful')
    isLogin.value = true
  } else {
    ElMessage.error('Username already taken. Please choose another username!')
  }
}
watch(isLogin, () => {
  formModel.value = {
    username: '',
    password: '',
    repassword: ''
  }
})
</script>

<template>
  <div class="login-container">
    <el-row justify="center">
      <el-col :xs="22" :sm="7">
        <div class="form" v-if="isLogin">
          <div class="title">
            <h1>Login to Interview Helper</h1>
          </div>
          <el-form
            ref="formRef"
            :model="formModel"
            :rules="rules"
            label-position="top"
            hide-required-asterisk
          >
            <el-form-item label="Username" prop="username">
              <el-input
                v-model="formModel.username"
                @blur="formModel.username = $event.target.value.trim()"
                prefix-icon="User"
              />
            </el-form-item>
            <el-form-item label="Password" prop="password">
              <el-input
                v-model="formModel.password"
                @blur="formModel.password = $event.target.value.trim()"
                prefix-icon="Lock"
                type="password"
                show-password
              />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="login">Login</el-button>
            </el-form-item>
          </el-form>
          <div class="bottom">
            <p style="margin-right: 5px">New to Interview Helper?</p>
            <el-link type="primary" :underline="false" @click="isLogin = false">
              Sign up
            </el-link>
          </div>
        </div>

        <div class="form" v-else>
          <div class="title">
            <h1>Create an account</h1>
          </div>
          <el-form
            ref="formRef"
            :model="formModel"
            :rules="rules"
            label-position="top"
            hide-required-asterisk
          >
            <el-form-item label="Username" prop="username">
              <el-input
                v-model="formModel.username"
                @blur="formModel.username = $event.target.value.trim()"
                prefix-icon="User"
              />
            </el-form-item>
            <el-form-item label="Password" prop="password">
              <el-input
                v-model="formModel.password"
                @blur="formModel.password = $event.target.value.trim()"
                prefix-icon="Lock"
                type="password"
                show-password
              />
            </el-form-item>
            <el-form-item label="Confirm Password" prop="repassword">
              <el-input
                v-model="formModel.repassword"
                @blur="formModel.repassword = $event.target.value.trim()"
                prefix-icon="Lock"
                type="password"
                show-password
              />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="register">Sign up</el-button>
            </el-form-item>
          </el-form>
          <div class="bottom">
            <p style="margin-right: 5px">Already have an account?</p>
            <el-link type="primary" :underline="false" @click="isLogin = true">
              Login
            </el-link>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped lang="scss">
.login-container {
  width: 100%;
  height: 100vh;

  .form {
    position: relative;
    top: 20vh;
    padding: 1rem;
    border: 1px solid #dce2e8;
    background-color: #f6f8fa;
    border-radius: 10px;

    .title {
      width: 100%;
      font-size: 24px;
      text-align: center;
    }

    .el-form {
      padding: 1rem;
      margin-top: 20px;

      .el-button {
        width: 100%;
      }
    }

    .bottom {
      display: flex;
      justify-content: center;
      font-size: 14px;
    }
  }
}
</style>

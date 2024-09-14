<script setup lang="ts">
import { useUserStore } from '@/stores'
import { onMounted } from 'vue'

const userStore = useUserStore()
onMounted(() => userStore.userGetInfo())
</script>

<template>
  <el-container>
    <el-aside></el-aside>
    <el-container>
      <el-header></el-header>
      <el-main></el-main>
      <el-footer></el-footer>
    </el-container>
  </el-container>
  <router-view></router-view>
</template>

<style scoped></style>

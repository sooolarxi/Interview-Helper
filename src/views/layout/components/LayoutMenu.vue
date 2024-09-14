<script setup lang="ts">
defineProps(['menuList'])
</script>

<template>
  <el-menu router :default-active="$route.path">
    <el-menu-item v-for="item in menuList" :key="item.path" :index="item.path">
      <el-icon><component :is="item.meta.icon" /></el-icon>
      <span>{{ item.meta.title }}</span>
    </el-menu-item>
  </el-menu>
</template>

<style scoped lang="scss">
.el-menu {
  border-right: none;
}
</style>

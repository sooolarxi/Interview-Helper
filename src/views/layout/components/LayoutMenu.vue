<script setup lang="ts">
defineProps(['menuList', 'isMobile'])
</script>

<template>
  <el-menu
    router
    :default-active="$route.path"
    :mode="isMobile ? 'horizontal' : 'vertical'"
  >
    <el-menu-item v-for="item in menuList" :key="item.path" :index="item.path">
      <el-icon><component :is="item.meta.icon" /></el-icon>
      <span v-if="!isMobile">{{ item.meta.title }}</span>
    </el-menu-item>
  </el-menu>
</template>

<style scoped lang="scss">
.el-menu {
  @media (min-width: 768px) {
    border-right: none;
  }
  @media (max-width: 768px) {
    justify-content: space-evenly;
    border-bottom: none;
    .el-menu-item {
      padding: 16px;
      border-bottom: none;
      & {
        --el-menu-hover-bg-color: transparent;
      }
    }
  }
}
</style>

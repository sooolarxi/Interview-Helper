<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const childComponentRef = ref()
const refreshQ = () => {
  if (route.path === '/questions') {
    childComponentRef.value.getQList()
  }
}
defineExpose({ refreshQ })
</script>

<template>
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <div v-if="$route.path === '/home' || $route.path === '/user'">
        <component :is="Component"></component>
      </div>
      <el-card v-else style="width: 100%">
        <component ref="childComponentRef" :is="Component"></component>
      </el-card>
    </transition>
  </router-view>
</template>

<style scoped lang="scss">
.el-card {
  height: 100%;
  @media (max-width: 768px) {
    height: auto;
  }
}
.fade-enter-from {
  opacity: 0;
  transform: translateX(-50px);
}

.fade-enter-active {
  transition: all 0.5s;
}

.fade-enter-to {
  opacity: 1;
  transform: translateX(0);
}
</style>

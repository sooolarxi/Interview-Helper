<script setup lang="ts"></script>

<template>
  <p>Sorry, the page you are looking for does not exist.</p>
  <el-button type="primary" @click="$router.push('/')">
    Return to homepage
  </el-button>
</template>

<style scoped lang="scss">
p {
  font-size: 20px;
  margin-bottom: 10px;
}
</style>

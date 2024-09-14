<script setup lang="ts">
import { useRouter } from 'vue-router'

defineProps(['dorpdownList', 'avatar'])

const router = useRouter()
const handleCommand = (command: string) => {
  if (command === 'logout') {
    console.log(command)
  } else {
    router.push(command)
  }
}
</script>

<template>
  <el-dropdown @command="handleCommand">
    <span class="el-dropdown-link">
      <el-avatar v-if="avatar" :src="avatar" />
      <el-avatar v-else icon="UserFilled" />
      <el-icon style="margin-left: 5px"><arrow-down /></el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="item in dorpdownList"
          :key="item.path"
          :command="item.path"
          :icon="item.meta.icon"
        >
          {{ item.meta.title }}
        </el-dropdown-item>

        <el-dropdown-item command="logout" icon="SwitchButton">
          Log out
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style scoped></style>

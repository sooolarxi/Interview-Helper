<script setup lang="ts">
import { useUserStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

defineProps(['dorpdownList', 'avatar'])

const { token, user } = storeToRefs(useUserStore())
const router = useRouter()
const handleCommand = async (command: string) => {
  if (command === 'logout') {
    try {
      await ElMessageBox.confirm(
        `Are you sure you want to log out?`,
        'Warning',
        {
          confirmButtonText: 'Yes',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }
      )
    } catch (error) {
      return
    }
    token.value = ''
    user.value = undefined
    router.push('/login')
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

<style scoped>
.el-dropdown-link {
  display: flex;
  align-items: center;
}
</style>

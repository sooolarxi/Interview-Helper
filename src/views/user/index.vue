<script setup lang="ts">
import { constantRoute } from '@/router/routes'
import { useUserStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const userMenuList = computed(
  () =>
    constantRoute
      .find((item) => item.path === '/layout')
      ?.children?.filter((item) => item.meta.group === 'user') || []
)
const { token, user } = storeToRefs(useUserStore())
const router = useRouter()
const handleSelect = async (MenuSelectEvent: string) => {
  if (MenuSelectEvent === 'logout') {
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
    router.push(MenuSelectEvent)
  }
}
</script>

<template>
  <el-card class="avatar">
    <div>
      <el-avatar v-if="user?.user_pic" :src="user?.user_pic" />
      <el-avatar v-else icon="UserFilled" />
      <span style="margin-left: 10px">
        {{ user?.nickname || user?.username }}
      </span>
    </div>
  </el-card>
  <el-menu @select="handleSelect">
    <el-menu-item
      v-for="item in userMenuList"
      :key="item.path"
      :index="item.path"
    >
      <el-icon><component :is="item.meta.icon" /></el-icon>
      <span>{{ item.meta.title }}</span>
    </el-menu-item>
    <el-menu-item index="logout">
      <el-icon><SwitchButton /></el-icon>
      <span>Log out</span>
    </el-menu-item>
  </el-menu>
</template>

<style scoped>
.avatar {
  margin-bottom: 10px;
  div {
    display: flex;
    align-items: center;
  }
}
.el-menu {
  border-right: none;
  border-radius: 4px;
  box-shadow: var(--el-box-shadow-light);
}
</style>

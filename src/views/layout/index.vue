<script setup lang="ts">
import { constantRoute } from '@/router/routes'
import { useUserStore } from '@/stores'
import { onMounted, ref, watch } from 'vue'
import LayoutMenu from './components/LayoutMenu.vue'
import { useRoute } from 'vue-router'
import LayoutDropdown from './components/LayoutDropdown.vue'

const userStore = useUserStore()
onMounted(() => userStore.userGetInfo())

const menuList = constantRoute.find((item) => item.path === '/')?.children || []
const PCMenu = menuList.filter(
  (item) => item.meta.device.includes('PC') && item.meta.group === 'menu'
)
const dorpdownList = menuList.filter((item) => item.meta.group === 'user')

const route = useRoute()
const title = ref(route.meta.title)
watch(route, () => (title.value = route.meta.title))
</script>

<template>
  <el-container class="layout-container">
    <el-aside>
      <div class="logo">logo</div>
      <LayoutMenu :menu-list="PCMenu"></LayoutMenu>
    </el-aside>

    <el-container>
      <el-header>
        <div class="title">{{ title }}</div>
        <LayoutDropdown
          :dorpdownList="dorpdownList"
          :avatar="userStore.user?.user_pic"
        ></LayoutDropdown>
      </el-header>

      <el-main>
        <router-view></router-view>
      </el-main>

      <el-footer></el-footer>
    </el-container>
  </el-container>
</template>

<style scoped lang="scss">
.layout-container {
  height: 100vh;
  .el-aside {
    width: 200px;
    height: 100vh;
    background-color: black;
    .logo {
      height: 100px;
      background-color: steelblue;
    }
  }
  .el-container {
    padding: 30px;
    .el-header {
      display: flex;
      justify-content: space-between;
      .title {
        font-size: 30px;
      }
    }
  }
}
</style>

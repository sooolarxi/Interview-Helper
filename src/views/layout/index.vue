<script setup lang="ts">
import { constantRoute } from '@/router/routes'
import { useDeviceStore, useUserStore } from '@/stores'
import { onMounted, ref, watch } from 'vue'
import LayoutMenu from './components/LayoutMenu.vue'
import { useRoute, useRouter } from 'vue-router'
import LayoutDropdown from './components/LayoutDropdown.vue'
import { storeToRefs } from 'pinia'

const { isMobile } = storeToRefs(useDeviceStore())

const userStore = useUserStore()
onMounted(() => userStore.userGetInfo())

const menuList = constantRoute.find((item) => item.path === '/')?.children || []
const PCMenu = menuList.filter(
  (item) => item.meta.device.includes('PC') && item.meta.group === 'menu'
)
const mobileMenu = menuList.filter(
  (item) => item.meta.device.includes('mobile') && item.meta.group === 'menu'
)
const dorpdownList = menuList.filter((item) => item.meta.group === 'user')

const route = useRoute()
const title = ref(route.meta.title)
watch(route, () => (title.value = route.meta.title))

const childComponentRef = ref()
const drawerRef = ref()
const router = useRouter()
const addQuestion = () => drawerRef.value.openDrawer('Add')
const handleSuccess = () => {
  if (route.path !== '/questions') router.push(`/questions`)
  else childComponentRef.value.getQList()
}
</script>

<template>
  <el-container class="layout-container">
    <el-aside class="hidden-xs-only">
      <div class="logo">logo</div>
      <LayoutMenu :menu-list="PCMenu" :is-mobile="isMobile"></LayoutMenu>
    </el-aside>

    <el-container>
      <el-header>
        <div class="title">{{ title }}</div>
        <LayoutDropdown
          class="hidden-xs-only"
          :dorpdownList="dorpdownList"
          :avatar="userStore.user?.user_pic"
        ></LayoutDropdown>
      </el-header>

      <el-main>
        <el-card style="width: 100%">
          <router-view v-slot="{ Component }">
            <component ref="childComponentRef" :is="Component"></component>
          </router-view>
        </el-card>
      </el-main>

      <el-footer class="hidden-sm-and-up">
        <LayoutMenu :menu-list="mobileMenu" :is-mobile="isMobile"></LayoutMenu>
      </el-footer>

      <el-button
        size="large"
        class="affix hidden-sm-and-up"
        type="primary"
        icon="Plus"
        circle
        @click="addQuestion"
      ></el-button>

      <QuestionEdit ref="drawerRef" @success="handleSuccess"></QuestionEdit>
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
    padding: 20px;
    .el-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .title {
        font-size: 30px;
      }
    }
    .el-card {
      height: 100%;
    }
    @media (max-width: 768px) {
      padding: 0px;
      .el-card {
        height: auto;
      }
      .el-footer {
        height: 50px;
      }
      .affix {
        position: fixed;
        right: 30px;
        bottom: 70px;
        z-index: 100;
      }
    }
  }
}
</style>

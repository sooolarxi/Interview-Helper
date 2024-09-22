<script setup lang="ts">
import { constantRoute } from '@/router/routes'
import { useDeviceStore, useUserStore } from '@/stores'
import { computed, onMounted, ref } from 'vue'
import LayoutMenu from './components/LayoutMenu.vue'
import { useRoute, useRouter } from 'vue-router'
import LayoutDropdown from './components/LayoutDropdown.vue'
import { storeToRefs } from 'pinia'
import LayoutMain from './components/LayoutMain.vue'
import Logo from '@/assets/logo_title.png'

const { isMobile } = storeToRefs(useDeviceStore())

const userStore = useUserStore()
onMounted(() => {
  userStore.userGetInfo()
  userStore.getStatistic()
})

const menuList = computed(
  () => constantRoute.find((item) => item.path === '/')?.children || []
)
const filterMenu = (device: string) =>
  menuList.value.filter(
    (item) => item.meta.device.includes(device) && item.meta.group === 'menu'
  )
const PCMenu = computed(() => filterMenu('PC'))
const mobileMenu = computed(() => filterMenu('mobile'))
const dorpdownList = computed(() =>
  menuList.value.filter((item) => item.meta.group === 'user')
)

const route = useRoute()
const title = computed(() => route.meta.title)

const LayoutMainRef = ref()
const drawerRef = ref()
const router = useRouter()
const addQuestion = () => drawerRef.value.openDrawer('Add')
const handleSuccess = () => {
  if (route.path !== '/questions') router.push(`/questions`)
  else LayoutMainRef.value.refreshQ()
}
</script>

<template>
  <el-container class="layout-container">
    <el-aside class="hidden-xs-only">
      <div class="logo">
        <img :src="Logo" alt="" />
      </div>
      <LayoutMenu :menu-list="PCMenu" :is-mobile="isMobile"></LayoutMenu>
    </el-aside>

    <el-container>
      <el-header>
        <div class="title">
          <el-icon
            v-if="isMobile && $route.meta.group === 'user'"
            style="margin-right: 5px"
            @click="$router.back()"
          >
            <arrow-left />
          </el-icon>
          {{ title }}
        </div>
        <LayoutDropdown
          class="hidden-xs-only"
          :dorpdownList="dorpdownList"
          :avatar="userStore.user?.user_pic"
        ></LayoutDropdown>
      </el-header>

      <el-main>
        <LayoutMain ref="LayoutMainRef"></LayoutMain>
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
  background: url(../../assets/PC_bg.png) bottom right / cover;
  @media (max-width: 768px) {
    background: url(../../assets/mobile_bg.png) bottom right / cover;
  }
  .el-aside {
    width: 200px;
    height: 100vh;
    background-color: #fff;
    box-shadow: 0 0 5px;
    .logo {
      height: 100px;
      img {
        height: 100px;
      }
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

    @media (max-width: 768px) {
      padding: 0px;
      .el-header {
        margin-top: 10px;
        .title {
          display: flex;
          align-items: center;
          .el-icon {
            font-size: 20px;
          }
        }
      }
      .el-footer {
        height: 50px;
        background-color: #fff;
      }
      .affix {
        position: fixed;
        right: 30px;
        bottom: 70px;
        z-index: 100;
        box-shadow: 2px 3px 5px rgba(0, 0, 0, 0.5);
      }
    }
  }
}
</style>

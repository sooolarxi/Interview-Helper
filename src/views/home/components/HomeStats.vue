<script setup lang="ts">
import { useDeviceStore, useUserStore } from '@/stores'
import { storeToRefs } from 'pinia'

const { isMobile } = storeToRefs(useDeviceStore())
const { totalCat, totalQ } = storeToRefs(useUserStore())

const statistics = [
  { title: 'Total Categories', value: totalCat.value, icon: 'CopyDocument' },
  { title: 'Total Questions', value: totalQ.value, icon: 'Notebook' }
]
</script>

<template>
  <el-space v-if="!isMobile" direction="vertical">
    <el-card
      v-for="(stat, index) in statistics"
      :key="index"
      style="text-align: center"
    >
      <el-statistic :title="stat.title" :value="stat.value">
        <template #suffix>
          <el-icon style="vertical-align: -0.125em">
            <component :is="stat.icon" />
          </el-icon>
        </template>
      </el-statistic>
    </el-card>
  </el-space>
  <el-card v-else style="text-align: center">
    <el-row>
      <el-col v-for="(stat, index) in statistics" :key="index" :span="12">
        <el-statistic :title="stat.title" :value="stat.value">
          <template #suffix>
            <el-icon style="vertical-align: -0.125em">
              <component :is="stat.icon" />
            </el-icon>
          </template>
        </el-statistic>
      </el-col>
    </el-row>
  </el-card>
</template>

<style scoped lang="scss"></style>

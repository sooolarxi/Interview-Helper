<script setup lang="ts">
import { catGetListService } from '@/api/category'
import type { catInfo } from '@/api/category/type'
import { onMounted, ref } from 'vue'

const modelValue = defineModel()

const catList = ref<catInfo[]>([])
const getCatList = async () => {
  const res = await catGetListService()
  catList.value = res.data as catInfo[]
}
onMounted(() => getCatList())
</script>

<template>
  <el-select v-model="modelValue">
    <el-option
      v-for="item in catList"
      :key="item.id"
      :label="item.cate_name"
      :value="item.id"
    />
  </el-select>
</template>

<style scoped></style>

<script setup lang="ts">
import { qGetInfoService } from '@/api/questions'
import type { qInfo } from '@/api/questions/type'
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { vPrint } from 'vue-print-next'

const route = useRoute()
const id = ref(route.query.id)
const qInfoArr = ref<qInfo[]>([])
const stripHtmlTags = (html: string) => {
  const div = document.createElement('div')
  div.innerHTML = html
  return div.textContent || div.innerText || ''
}
onMounted(async () => {
  if (typeof id.value === 'string') {
    const res = await qGetInfoService(id.value)
    const data = res.data as qInfo
    data.content = stripHtmlTags(data.content as string)
    qInfoArr.value.push(data)
  } else {
    const promises = (id.value as string[]).map(async (item: string) => {
      const res = await qGetInfoService(item)
      const data = res.data as qInfo
      data.content = stripHtmlTags(data.content as string)
      return data
    })
    const res = await Promise.all(promises)
    qInfoArr.value.push(...res)
  }
})

const formModel = ref({
  fontSize: '1.25',
  order: 'Ascending',
  onlyQ: ''
})
watch(
  () => formModel.value.order,
  () => qInfoArr.value.reverse()
)
</script>

<template>
  <el-scrollbar height="400px">
    <div class="container">
      <el-form
        :model="formModel"
        label-width="auto"
        label-position="top"
        style="max-width: 250px"
      >
        <el-form-item label="Font size">
          <el-radio-group v-model="formModel.fontSize">
            <el-radio value="1">Small</el-radio>
            <el-radio value="1.25">default</el-radio>
            <el-radio value="1.5">Large</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="Order">
          <el-radio-group v-model="formModel.order">
            <el-radio value="Ascending">Ascending</el-radio>
            <el-radio value="Descending">Descending</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="Activity type">
          <el-checkbox v-model="formModel.onlyQ">
            Print Questions Only
          </el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-print="'#questions'">print</el-button>
        </el-form-item>
        <p style="color: #909399; font-size: 12px">
          Tips: Set the margins to "None" in the print settings for optimal
          results!
        </p>
      </el-form>

      <div id="questions">
        <div
          class="question"
          :class="{
            fz1: formModel.fontSize === '1',
            fz125: formModel.fontSize === '1.25',
            fz15: formModel.fontSize === '1.5'
          }"
          v-for="(item, index) in qInfoArr"
          :key="item.id"
        >
          <h3>
            <!-- eslint-disable -->
            <span class="order">{{ `Q${index + 1}.` }}</span>{{ item.title }}
          </h3>
          <p class="content" v-if="!formModel.onlyQ">{{ item.content }}</p>
        </div>
      </div>
    </div>
  </el-scrollbar>
</template>

<style scoped lang="scss">
#questions {
  padding: 25.4mm 31.8mm;
  .question {
    line-height: 1.5;
    h3 {
      font-weight: 600;
      .order {
        display: inline-block;
        width: 2em;
      }
    }
    .content {
      padding-left: 2em;
    }
  }
}

.fz1 {
  font-size: 1em;
}
.fz125 {
  font-size: 1.25em;
}
.fz15 {
  font-size: 1.5em;
}

.container {
  padding: 10px;
  display: flex;
  justify-content: space-evenly;
  #questions {
    width: 210mm;
    height: 297mm;
    box-shadow: 0 0 10px;
    zoom: 0.5;
  }
}
</style>

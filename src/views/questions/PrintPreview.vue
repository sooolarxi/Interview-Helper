<script setup lang="ts">
import { qGetInfoService } from '@/api/questions'
import type { qInfo } from '@/api/questions/type'
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { vPrint } from 'vue-print-next'
import { storeToRefs } from 'pinia'
import { useDeviceStore } from '@/stores'

const { isMobile } = storeToRefs(useDeviceStore())

const route = useRoute()
const id = route.query.id as string[]
const qInfoArr = ref<qInfo[]>([])
const stripHtmlTags = (html: string) => html.replace(/<\/?[^>]+(>|$)/g, '')
const fetchQuestionData = async (id: string[]) => {
  const promises = id.map(async (item: string) => {
    const res = await qGetInfoService(item)
    const data = res.data as qInfo
    if (stripHtmlTags(res.data?.content as string) === 'No Data')
      data.content = ''
    return data
  })
  const res = await Promise.all(promises)
  qInfoArr.value.push(...res)
}
onMounted(() => fetchQuestionData(id))

const formModel = ref({
  fontSize: 'Default',
  order: 'Ascending',
  onlyQ: ''
})
watch(
  () => formModel.value.order,
  () => qInfoArr.value.reverse()
)
</script>

<template>
  <el-scrollbar :height="isMobile ? '800px' : '400px'">
    <h3
      v-if="isMobile"
      style="margin-bottom: 10px; color: red; font-size: 20px; line-height: 1.5"
    >
      Currently, the print feature is only supported on PC.
    </h3>
    <div class="container">
      <el-form
        :model="formModel"
        label-width="auto"
        label-position="top"
        style="max-width: 250px; margin-bottom: 20px"
      >
        <el-form-item label="Font size">
          <el-radio-group v-model="formModel.fontSize">
            <el-radio value="Small">Small</el-radio>
            <el-radio value="Default">Default</el-radio>
            <el-radio value="Large">Large</el-radio>
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
          <el-button :disabled="isMobile" type="primary" v-print="'#questions'">
            print
          </el-button>
        </el-form-item>
        <p style="color: #909399; font-size: 12px; line-height: 1.5">
          Tips: Set the margins to "None" in the print settings for optimal
          results!
        </p>
      </el-form>

      <div id="questions">
        <div
          class="question"
          :class="{
            fzSmall: formModel.fontSize === 'Small',
            fzDefault: formModel.fontSize === 'Default',
            fzLarge: formModel.fontSize === 'Large'
          }"
          v-for="(item, index) in qInfoArr"
          :key="item.id"
        >
          <h3>
            <!-- eslint-disable -->
            <span class="order">{{ `Q${index + 1}.` }}</span>{{ item.title }}
          </h3>
          <div class="content" v-if="!formModel.onlyQ" v-html="item.content"></div>
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

.fzSmall {
  font-size: $question-print-font-small;
}
.fzDefault {
  font-size: $question-print-font-default;
}
.fzLarge {
  font-size: $question-print-font-large;
}

.container {
  padding: 10px;
  display: flex;
  justify-content: space-evenly;
  @media (max-width: 768px) {
    display: block;
  }
  #questions {
    width: 210mm;
    height: 297mm;
    box-shadow: 0 0 10px;
    zoom: 0.5;
    @media (max-width: 360px) {
      zoom: 0.25;
    }
    @media (max-width: 414px) {
      zoom: 0.3;
    }
    @media (max-width: 480px) {
      zoom: 0.35;
    }
  }
}
</style>

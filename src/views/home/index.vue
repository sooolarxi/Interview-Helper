<script setup lang="ts">
import { useDeviceStore, useUserStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { onMounted, ref, nextTick, watch } from 'vue'
import * as echarts from 'echarts/core'
import { TooltipComponent, LegendComponent } from 'echarts/components'
import type {
  TooltipComponentOption,
  LegendComponentOption
} from 'echarts/components'
import { PieChart } from 'echarts/charts'
import type { PieSeriesOption } from 'echarts/charts'
import { LabelLayout } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'
import HomeStats from './components/HomeStats.vue'

echarts.use([
  TooltipComponent,
  LegendComponent,
  PieChart,
  CanvasRenderer,
  LabelLayout
])

type EChartsOption = echarts.ComposeOption<
  TooltipComponentOption | LegendComponentOption | PieSeriesOption
>
const chartRef = ref<HTMLDivElement | null>(null)
const { isMobile } = storeToRefs(useDeviceStore())
const { user, totalRQ, totalUQ } = storeToRefs(useUserStore())

let myChart: echarts.ECharts | null = null
const renderChart = (resize?: boolean) => {
  if (chartRef.value) {
    if (myChart && resize) {
      ;(myChart as unknown as echarts.ECharts).resize()
      return
    }
    myChart = echarts.init(chartRef.value)
    const option: EChartsOption = {
      tooltip: {
        show: true,
        formatter: '{b0}'
      },
      legend: {
        top: '5%',
        left: 'center'
      },
      series: [
        {
          name: 'Question Status',
          type: 'pie',
          radius: ['40%', '70%'],
          center: ['50%', '70%'],
          startAngle: 180,
          endAngle: 360,
          data: [
            { value: totalRQ.value, name: `Resolved: ${totalRQ.value}` },
            { value: totalUQ.value, name: `Unanswered: ${totalUQ.value}` }
          ],
          label: {
            show: false
          }
        }
      ]
    }
    option && myChart.setOption(option)
  }
}
onMounted(() => nextTick(() => renderChart()))
watch([totalRQ, totalUQ], () => nextTick(() => renderChart()))

const refresh = ref(false)
watch(isMobile, () => {
  refresh.value = true
  nextTick(() => {
    refresh.value = false
    renderChart(true)
  })
})
</script>

<template>
  <el-card class="avatar">
    <h3 style="margin-left: 10px">
      Hello🖐️ {{ user?.nickname || user?.username }}
    </h3>
  </el-card>
  <div class="statistic">
    <HomeStats v-if="!refresh" class="hidden-sm-and-up"></HomeStats>
    <el-card class="chartCard">
      <div class="chartRef" ref="chartRef"></div>
    </el-card>
    <HomeStats v-if="!refresh" class="hidden-xs-only"></HomeStats>
  </div>
</template>

<style scoped lang="scss">
.avatar {
  margin-bottom: 10px;
  h3 {
    font-size: 36px;
  }
}
.statistic {
  display: flex;
  @media (max-width: 768px) {
    display: block;
  }
  .chartCard {
    width: 500px;
    margin-right: 10px;
    @media (max-width: 768px) {
      width: 100%;
      margin-top: 10px;
    }
    .chartRef {
      width: 100%;
      height: 300px;
    }
  }
}
</style>

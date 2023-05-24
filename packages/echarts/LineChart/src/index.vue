<template>
  <div ref="lineChartElement" :class="className" :style="{ height, width }" />
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import { onMounted, shallowReactive, watch, ref, computed, onBeforeUnmount } from 'vue'
import { echarts } from '@plus-pro-components/echarts/echarts'
import { useResize } from '@plus-pro-components/hooks'

const props = defineProps({
  className: {
    type: String,
    default: 'line-chart'
  },
  width: {
    type: String,
    default: ''
  },
  height: {
    type: String,
    default: '540px'
  },
  // 数据
  yData: {
    type: Object as PropType<number[] | string[]>,
    default: () => [...new Array(12)].map((_, index) => (index + 1) * 100 * Math.random())
  },
  // 横轴的坐标标签
  xAxisData: {
    type: Array as PropType<string[] | number[]>,
    default: () => [...new Array(12)].map((_, index) => index * 2 + 'm')
  },
  // 横轴的坐标名称
  xAxisName: {
    type: String,
    default: '帧序号'
  },
  // y轴的坐标名称
  yAxisName: {
    type: String,
    default: '水尺读数'
  }
})

const state = shallowReactive<{ chart: echarts.ECharts | null }>({
  chart: null
})
const lineChartElement = ref<ElementRefType>(null)
// 图例
// 实际数据
const practicalSeries = computed(() => ({
  name: props.yAxisName,
  type: 'line',
  data: props.yData,
  areaStyle: {
    color: {
      type: 'linear',
      x: 0,
      y: 0,
      x2: 0,
      y2: 1,
      colorStops: [
        {
          offset: 0,
          color: 'rgba(59, 214, 227, 1)' // 0% 处的颜色
        },
        {
          offset: 1,
          color: 'rgba(59, 214, 227, 0.5)' // 100% 处的颜色
        }
      ],
      global: false // 缺省为 false
    }
  }
}))

// 计算最大值和最小值 好分割y轴
const range = computed(() => {
  const data = props.yData.map(item => Number(item)).sort((a, b) => a - b)
  return {
    min: Math.floor(data[0]),
    max: Math.ceil(data[data.length - 1])
  }
})

// 初始化
const initChart = () => {
  if (!lineChartElement.value) return
  state.chart = echarts.init(lineChartElement.value as HTMLElement)
  setOption()
}
// 设置数据
const setOption = () => {
  const options: echarts.EChartsOption = {
    title: {
      text: ''
    },
    color: ['rgba(59, 214, 227, 1)'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        show: true,
        type: 'cross'
      }
    },
    dataZoom: [
      {
        type: 'inside',
        start: 0,
        end: 35
      },
      {
        start: 0,
        end: 35
      }
    ],
    legend: {
      show: false,
      data: [props.yAxisName]
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '12%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: [...props.xAxisData],
      name: props.xAxisName
    },
    yAxis: {
      type: 'value',
      min: range.value.min,
      interval: 0.1,
      max: range.value.max,
      axisLabel: {
        formatter: function (value: number) {
          return value.toFixed(2) + 'm'
        }
      }
    },
    series: practicalSeries.value as echarts.SeriesOption
  }
  state.chart && state.chart.setOption(options)
}
// 销毁实例
const removeChart = () => {
  state.chart && state.chart.dispose()
  state.chart = null
}
// 页面窗口变化调整图的大小
const addResizeEvent = () => {
  if (state.chart) {
    state.chart.clear()
    state.chart.resize()
    setOption()
  }
}
useResize(addResizeEvent)
// 监听数据变化
watch(
  () => [props.yData, props.xAxisData],
  () => {
    setOption()
  },
  {
    deep: true,
    immediate: true
  }
)
onMounted(() => {
  initChart()
})
onBeforeUnmount(() => {
  removeChart()
})
</script>

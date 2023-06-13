<template>
  <div ref="horizontalBarChartElement" :class="className" :style="{ height, width }" />
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import { onMounted, shallowReactive, watch, ref, onBeforeUnmount } from 'vue'
import echarts from 'echarts'
import useResize from '../../utils/useResize'

const props = defineProps({
  className: {
    type: String,
    default: 'line-bar-chart'
  },
  width: {
    type: String,
    default: ''
  },
  height: {
    type: String,
    default: '540px'
  },
  // 标题
  title: {
    type: Object,
    default: () => ({
      text: '',
      subtext: ''
    })
  },
  // 横轴的坐标名称
  xAxisName: {
    type: String,
    default: ''
  },
  // y轴的坐标名称
  yAxisName: {
    type: String,
    default: ''
  },
  // 横坐标数据
  xAxisData: {
    type: Array as PropType<string[] | number[]>,
    default: () => [...new Array(12)].map((_, index) => index * 2)
  },
  // 数据
  yData: {
    type: Array as PropType<string[] | number[]>,
    default: () => [...new Array(12)].map((_, index) => (index + 1) * 100 * Math.random())
  }
})

const state = shallowReactive<{ chart: echarts.ECharts | null }>({
  chart: null
})
const horizontalBarChartElement = ref<ElementRefType>(null)

// 初始化
const initChart = () => {
  state.chart = echarts.init(horizontalBarChartElement.value as HTMLElement)
  setOption()
}
// 设置数据
const setOption = () => {
  const options: echarts.EChartsOption = {
    title: {
      text: props.title.text,
      subtext: props.title.subtext
    },
    color: ['rgba(59, 214, 227, 1)'],
    tooltip: {
      trigger: 'item',
      // formatter: '吃水值：{b}\r\n吃水值出现的次数：{c}',
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
      data: []
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '12%',
      containLabel: true
    },
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    xAxis: {
      type: 'category',
      boundaryGap: [0, 0.01],
      data: props.xAxisData,
      name: props.xAxisName
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        showBackground: true,
        name: props.yAxisName,
        type: 'bar',
        data: props.yData
      }
    ]
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
    immediate: true,
    deep: true
  }
)
onMounted(() => {
  initChart()
})
onBeforeUnmount(() => {
  removeChart()
})
</script>

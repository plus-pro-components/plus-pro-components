<template>
  <div ref="pieChartChartElement" :class="className" :style="{ height, width }" />
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import { onMounted, shallowReactive, watch, ref, onBeforeUnmount } from 'vue'
import echarts from 'echarts'
import type { ElementRefType } from '@plus-pro-components/types'
import useResize from '../../utils/useResize'

const props = defineProps({
  className: {
    type: String,
    default: 'pie-chart'
  },
  width: {
    type: String,
    default: '100%'
  },
  height: {
    type: String,
    default: '280px'
  },
  // yAxisData
  yAxisData: {
    type: Array as PropType<
      {
        value: number
        name: string
      }[]
    >,
    default: () => [
      { value: 335, name: '直接访问' },
      { value: 310, name: '邮件营销' },
      { value: 234, name: '联盟广告' },
      { value: 135, name: '视频广告' },
      { value: 1548, name: '搜索引擎' }
    ]
  },
  // 标题
  title: {
    type: String,
    default: ''
  },
  // 副标题
  subtext: {
    type: String,
    default: ''
  },
  // chartName
  chartName: {
    type: String,
    default: '百分比'
  },
  // 圆的位置
  centerLocation: {
    type: Array as PropType<string[]>,
    default: () => ['50%', '60%']
  },
  labelFormatter: {
    type: String,
    default: '{b} : {c} ({d}%)'
  },
  legendPosition: {
    type: Object as PropType<{
      top: number
      right: number
      bottom: number
      left: number
    }>,
    default: () => ({ bottom: 0 })
  }
})

const state = shallowReactive<{ chart: echarts.ECharts | null }>({
  chart: null
})
const pieChartChartElement = ref<ElementRefType>(null)

// 初始化
const initChart = () => {
  state.chart = echarts.init(pieChartChartElement.value as HTMLElement)
  setOption()
}
// 设置数据
const setOption = () => {
  const options: echarts.EChartsOption = {
    title: {
      text: props.title,
      subtext: props.subtext,
      itemGap: 150,
      subtextStyle: {
        color: '#8c8c8c',
        fontWeight: 400,
        fontSize: 20
      },
      left: 'center',
      textStyle: {
        color: 'black',
        fontSize: 14
      },
      triggerEvent: true
    },
    label: {
      formatter: '{b|{b}} \n {c}{per|{d}%}  ',
      backgroundColor: '#fff',
      rich: {
        a: {
          color: '#999',
          lineHeight: 22,
          align: 'center'
        },
        hr: {
          borderColor: '#aaa',
          width: '100%',
          borderWidth: 0.5,
          height: 0
        },
        b: {
          align: 'center',
          fontSize: 12,
          lineHeight: 33
        },
        per: {
          color: '#eee',
          backgroundColor: '#334455',
          padding: [2, 4],
          borderRadius: 2
        }
      }
    },
    labelLine: {
      normal: {
        smooth: 0.2,
        length: 0,
        length2: 0
      }
    },
    tooltip: {
      trigger: 'item',
      formatter: '{b} : {c} ({d}%)'
    },
    legend: {
      // orient: 'vertical',
      ...props.legendPosition,
      textStyle: {
        color: '#999',
        fontSize: 12
      },
      data: props.yAxisData.map(item => item.name)
    },
    calculable: true,
    series: [
      {
        name: props.chartName,
        type: 'pie',
        radius: '55%',
        center: props.centerLocation,
        data: props.yAxisData,
        label: {
          formatter: props.labelFormatter,
          position: 'outer',
          alignTo: 'none',
          bleedMargin: 5,
          show: true
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
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
  () => props.yAxisData,
  () => {
    setOption()
  }
)
onMounted(() => {
  initChart()
})
onBeforeUnmount(() => {
  removeChart()
})
</script>

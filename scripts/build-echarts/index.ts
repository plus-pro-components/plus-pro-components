import consola from 'consola'

import all from './all'
import modules from './modules'
import dts from './dts'

const task = [...all, ...modules, ...dts]

Promise.all(task).then(async () => {
  consola.success('Successfully built into echarts components!')
})

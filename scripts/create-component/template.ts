import path from 'path'
import { format } from 'prettier'
import { upperFirst, camelCase } from 'lodash-es'

const resolve = (dir: string) => path.resolve(__dirname, dir)

const formatConfigPath = resolve('../../.prettierrc.js')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const formatConfig = require(formatConfigPath)

const getName = (componentName: string) => `Plus${upperFirst(camelCase(componentName))}`

export const getTargetFileTemplate = (componentName: string) => {
  const name = getName(componentName)
  const template = `
    import ${name} from './src/index.vue'

    export { ${name} }
    export default ${name}    
    `
  return format(template, { ...formatConfig, parser: 'babel-ts' })
}

export const getSrcFileTemplate = (componentName: string) => {
  const name = getName(componentName)
  const props = `${name}Props`
  const emits = `${name}Emits`
  const template = `
  <template>
    <div>${name}</div>
  </template>

  <script lang="ts" setup>
 
  export interface ${props}{
    modelValue:string
  } 

  export interface ${emits} {
    (e: 'update:modelValue', data: string): void 
  }

  defineOptions({
    name: '${name}'
  })

  const props = withDefaults(defineProps<${props}>(), {
    modelValue: ''   
  })

  const emit = defineEmits<${emits}>()

  </script>
    `
  return format(template, { ...formatConfig, parser: 'vue' })
}

export const getTestFileTemplate = (componentName: string) => {
  const template = `
  import { describe, expect, test } from 'vitest'

  describe('${componentName}/index.vue', () => {
    test('render test', async () => {
      expect('').includes('')
    })
  })  
    `
  return format(template, { ...formatConfig, parser: 'babel-ts' })
}

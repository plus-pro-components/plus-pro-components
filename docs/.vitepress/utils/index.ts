import { utoa } from './utils'
const MAIN_FILE_NAME = 'App.vue'

export const getPlaygroundEncoded = (source: string) => {
  const code = decodeURIComponent(source)
  const originCode = {
    [MAIN_FILE_NAME]: code
  }
  const encoded = utoa(JSON.stringify(originCode))
  return encoded
}

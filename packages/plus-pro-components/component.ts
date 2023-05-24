import type { DefineComponent } from 'vue'

import { PlusDialog } from '@plus-pro-components/components/dialog'
import { PlusPagination } from '@plus-pro-components/components/pagination'

const plugins: DefineComponent[] = [PlusDialog, PlusPagination] as unknown as DefineComponent[]

export default plugins

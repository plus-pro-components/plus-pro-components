import type { DefineComponent } from 'vue'

import { PlusDialog } from '@plus-pro-components/components/dialog'
import { PlusPagination } from '@plus-pro-components/components/pagination'
import { PlusImagePreview } from '@plus-pro-components/components/image-preview'
import { PlusTable } from '@plus-pro-components/components/table'

const plugins: DefineComponent[] = [
  PlusDialog,
  PlusPagination,
  PlusImagePreview,
  PlusTable
] as unknown as DefineComponent[]

export default plugins

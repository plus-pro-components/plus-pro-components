import type { DefineComponent } from 'vue'

import { PlusDialog } from '@plus-pro-components/components/dialog'
import { PlusPagination } from '@plus-pro-components/components/pagination'
import { PlusImagePreview } from '@plus-pro-components/components/image-preview'
import { PlusTable } from '@plus-pro-components/components/table'
import { PlusRadio } from '@plus-pro-components/components/radio'
import { PlusDatePicker } from '@plus-pro-components/components/date-picker'
import { PlusDescriptions } from '@plus-pro-components/components/descriptions'
import { PlusForm } from '@plus-pro-components/components/form'

const plugins: DefineComponent[] = [
  PlusDialog,
  PlusPagination,
  PlusImagePreview,
  PlusTable,
  PlusRadio,
  PlusDatePicker,
  PlusDescriptions,
  PlusForm
] as unknown as DefineComponent[]

export default plugins

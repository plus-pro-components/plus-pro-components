// GlobalComponents for Volar
declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    PlusDialog: typeof import('plus-pro-components')['PlusDialog']
    PlusPagination: typeof import('plus-pro-components')['PlusPagination']
    PlusImagePreview: typeof import('plus-pro-components')['PlusImagePreview']
    PlusTable: typeof import('plus-pro-components')['PlusTable']
    PlusRadio: typeof import('plus-pro-components')['PlusRadio']
    PlusDatePicker: typeof import('plus-pro-components')['PlusDatePicker']
  }
}

export {}

// GlobalComponents for Volar
declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    PlusDialog: typeof import('plus-pro-components')['PlusDialog']
    PlusPagination: typeof import('plus-pro-components')['PlusPagination']
  }
}

export {}

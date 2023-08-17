// GlobalComponents for Volar
declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    PlusDialog: typeof import('plus-pro-components')['PlusDialog']
    PlusPagination: typeof import('plus-pro-components')['PlusPagination']
    PlusTable: typeof import('plus-pro-components')['PlusTable']
    PlusRadio: typeof import('plus-pro-components')['PlusRadio']
    PlusDatePicker: typeof import('plus-pro-components')['PlusDatePicker']
    PlusDescriptions: typeof import('plus-pro-components')['PlusDescriptions']
    PlusForm: typeof import('plus-pro-components')['PlusForm']
    PlusSearch: typeof import('plus-pro-components')['PlusSearch']
    PlusDialogForm: typeof import('plus-pro-components')['PlusDialogForm']
    PlusDrawerForm: typeof import('plus-pro-components')['PlusDrawerForm']
    PlusPage: typeof import('plus-pro-components')['PlusPage']
    PlusPopover: typeof import('plus-pro-components')['PlusPopover']
    PlusStepsForm: typeof import('plus-pro-components')['PlusStepsForm']
  }
}

export {}

export interface PlusImagePreviewRow {
  url: string
  name?: string
}

export interface State {
  currentIndex: number
  subSrc: string
  subName: string
  subSrcList: PlusImagePreviewRow[]
  subShow: boolean
}

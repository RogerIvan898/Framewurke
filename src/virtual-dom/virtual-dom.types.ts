export interface IVirtualNodeProps{
  [key: string]: string
}

export interface IVirtualElement{
  tag: string
  content?: IVirtualNode[]
  props?: IVirtualNodeProps
}

export type IVirtualNode = IVirtualElement | string
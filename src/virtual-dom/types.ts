export interface IVirtualNodeProps {
  [key: string]: string | Function
}

export type CustomElement = Element & IVirtualNodeProps

export interface IVirtualNode {
  type: 'element' | 'text'
}

export interface IVirtualElement extends IVirtualNode{
  type: 'element'
  tag: string
  content: IVirtualNode[]
  props: IVirtualNodeProps
}

export interface IVirtualText extends IVirtualNode{
  type: 'text'
  content: string
}
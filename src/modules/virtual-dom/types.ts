import {JSX} from "../../jsx";

export type VirtualNodePropsValue = string | Function | number

export interface IVirtualNodeProps {
  [key: string]: VirtualNodePropsValue
}

export interface IVirtualNode extends JSX.Element{
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

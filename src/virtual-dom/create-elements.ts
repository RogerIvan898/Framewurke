import {IVirtualElement, IVirtualNode, IVirtualNodeProps, IVirtualText} from "./types";

export class VDOM_CREATE_ELEMENT {
  static createVElement(text: string): IVirtualText
  static createVElement(tag: string, content: IVirtualNode[]): IVirtualElement
  static createVElement(tag: string, props: IVirtualNodeProps, content?: (IVirtualNode | string)[]): IVirtualElement

  static createVElement (
    arg1: string,
    arg2?: IVirtualNodeProps | IVirtualNode[],
    arg3?: (IVirtualNode | string)[]
  ) {
    if(arg2 === undefined && arg3 === undefined){
      return VDOM_CREATE_ELEMENT.createVirtualTextNode(arg1)
    }

    if(Array.isArray(arg2) && arg3 === undefined) {
      return VDOM_CREATE_ELEMENT.createVirtualElement(arg1,{}, arg2)
    }

    const nestedElements = arg3?.map(node =>
      typeof node === 'string' ? VDOM_CREATE_ELEMENT.createVirtualTextNode(node) : node
    ) ?? []

    return VDOM_CREATE_ELEMENT.createVirtualElement(arg1, arg2 as IVirtualNodeProps, nestedElements)
  }

  static createVirtualElement(tag: string, props: IVirtualNodeProps, content: IVirtualNode[]): IVirtualElement {
    return { type: 'element', tag, props, content }
  }

  static createVirtualTextNode(text: string): IVirtualText{
    return {type: 'text', content: text}
  }

  static createElementFromVNode (vNode: IVirtualNode){
    if (vNode.type === 'text') {
      return document.createTextNode((vNode as IVirtualText).content)
    }

    const { tag, props = {} as IVirtualNodeProps, content = [] } = <IVirtualElement>vNode
    const element = document.createElement(tag)

    for (const [key, value] of Object.entries(props)) {
      element.setAttribute(key, value)
    }

    for (const nestedElement of content) {
      element.appendChild(VDOM_CREATE_ELEMENT.createElementFromVNode(nestedElement))
    }

    return element
  }
}
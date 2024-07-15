import {IVirtualElement, IVirtualNode, IVirtualNodeProps, IVirtualText} from "./types";

type CreateVirtualElementProps = (IVirtualNode | string)[]

export class VDOM_CREATE_ELEMENT {
  static createVElement(text: string): IVirtualText
  static createVElement(tag: string, content: CreateVirtualElementProps): IVirtualElement
  static createVElement(tag: string, props: IVirtualNodeProps, content?: CreateVirtualElementProps): IVirtualElement

  static createVElement (
    arg1: string,
    arg2?: IVirtualNodeProps | CreateVirtualElementProps,
    arg3?: CreateVirtualElementProps
  ) {
    if(arg2 === undefined && arg3 === undefined){
      return this.createVirtualTextNode(arg1)
    }

    if(Array.isArray(arg2) && arg3 === undefined) {
      const nestedElements = 2 ? this.createVirtualNestedElements(arg2) : []
      return this.createVirtualElement(arg1, {}, nestedElements)
    }

    const nestedElements = arg3 ? this.createVirtualNestedElements(arg3) : []

    return this.createVirtualElement(arg1, arg2 as IVirtualNodeProps, nestedElements)
  }

  private static createVirtualNestedElements(nestedElements: CreateVirtualElementProps){
    return nestedElements.map(node =>
      typeof node === 'string' ? VDOM_CREATE_ELEMENT.createVirtualTextNode(node) : node
    ) ?? []
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
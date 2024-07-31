import type {IVirtualElement, IVirtualNode, IVirtualNodeProps, IVirtualText} from "./types";
import VDOM_UPDATE_ELEMENT from "./update-element.js";
import {isNullOrUndefined} from "../helpers";

type CreateVirtualElementProps = (IVirtualNode | string)[]

export default class VDOM_CREATE_ELEMENT {
  static createVirtualNode(text: string): IVirtualText
  static createVirtualNode(tag: string, content: CreateVirtualElementProps): IVirtualElement
  static createVirtualNode(
    tag: string, props: IVirtualNodeProps, ...content: CreateVirtualElementProps
  ): IVirtualElement

  public static createVirtualNode (
    arg1: string | Function,
    arg2?: IVirtualNodeProps | CreateVirtualElementProps,
    ...arg3: CreateVirtualElementProps
  ) {
    if(arg1 instanceof Function){
      return VDOM_CREATE_ELEMENT.createVirtualNodeFromCustomElement(arg1)
    }
    if(isNullOrUndefined(arg2) && isNullOrUndefined(arg3)){
      return VDOM_CREATE_ELEMENT.createVirtualTextNode(arg1)
    }

    if(arg2 === null){
      arg2 = {}
    }

    if(Array.isArray(arg2) && arg3 === undefined) {
      const nestedElements = VDOM_CREATE_ELEMENT.createVirtualNestedElements(arg2)
      return VDOM_CREATE_ELEMENT.createVirtualElement(arg1, {}, nestedElements)
    }

    const _nestedElements = arg3 ? VDOM_CREATE_ELEMENT.createVirtualNestedElements(arg3) : []

    return VDOM_CREATE_ELEMENT.createVirtualElement(arg1, arg2 as IVirtualNodeProps, _nestedElements)
  }

  private static createVirtualNestedElements(nestedElements: CreateVirtualElementProps){
    return nestedElements?.map(node =>
      typeof node === 'string'
        ? VDOM_CREATE_ELEMENT.createVirtualTextNode(node)
        : node
    ) ?? []
  }

  private static createVirtualNodeFromCustomElement(element: Function){
    return element()
  }

  private static createVirtualElement(tag: string, props: IVirtualNodeProps, content: IVirtualNode[]): IVirtualElement {
    return { type: 'element', tag, props, content: content }
  }

  private static createVirtualTextNode(text: string): IVirtualText{
    return {type: 'text', content: text}
  }

  public static createElementFromVNode (vNode: IVirtualNode){
    if (vNode.type === 'text') {
      return document.createTextNode((vNode as IVirtualText).content)
    }

    const { tag, props = {}, content = [] } = vNode as IVirtualElement

    const element = document.createElement(tag)

    VDOM_UPDATE_ELEMENT.updateProps(element, {}, props)

    content.forEach(nestedElement =>
      element.appendChild(VDOM_CREATE_ELEMENT.createElementFromVNode(nestedElement))
    )

    return element
  }
}
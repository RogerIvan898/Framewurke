import {IVirtualElement, IVirtualNode, IVirtualNodeProps} from "./virtual-dom.types";

export namespace VDOM_CREATE_ELEMENT{
  export const createVElement = (
    tag: string,
    props: IVirtualNodeProps = {},
    content:  IVirtualNode[] = []
  ): IVirtualElement => {
    return {
      tag,
      props,
      content
    }
  }

  export const createElementFromVNode = (vNode: IVirtualNode) => {
    if (typeof vNode === 'string') {
      return document.createTextNode(vNode)
    }

    const { tag, props = {} as IVirtualNodeProps, content = [] } = vNode
    const element = document.createElement(tag)

    for (const [key, value] of Object.entries(props)) {
      element.setAttribute(key, value)
    }

    for (const nestedElement of content) {
      element.appendChild(createElementFromVNode(nestedElement))
    }

    return element
  }
}
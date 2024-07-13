import IVirtualNodeProps = VDom.IVirtualNodeProps
import IVirtualElement = VDom.IVirtualElement
import IVirtualNode = VDom.IVirtualNode

export namespace VDOM_CREATE_ELEMENT{
  export const createVElement = (
    tag: string,
    props: IVirtualNodeProps = {},
    content:  IVirtualNode[] = []
  ): IVirtualElement => {
    return { tag, props, content }
  }

  export const createElementFromVNode = (vNode: IVirtualNode | string) => {
    if (typeof vNode === 'string') {
      return document.createTextNode(vNode)
    }

    const { tag, props = {}, content = [] } = vNode
    const element = document.createElement(tag)

    for (const [key, value] of Object.entries(props)) {
      element.setAttribute(key, value as string)
    }

    for (const nestedElement of content) {
      element.appendChild(createElementFromVNode(nestedElement))
    }

    return element
  }
}
import type {IVirtualElement, IVirtualNode, IVirtualNodeProps} from "./virtual-dom.types.js"

export namespace VDom{
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

    const {tag, props = [], content = []} = vNode
    const element = document.createElement(tag)

    for (const [key, value] of Object.entries(props)) {
      element.setAttribute(key, value)
    }

    for (const nestedElement of content) {
      element.appendChild(createElementFromVNode(nestedElement))
    }

    return element
  }

  export const mount = (node: Node, target: HTMLElement) => {
    target.replaceWith(node)
    return node
  }

  export const upDateVNode = (container: Element, vNode: IVirtualNode, newNode: IVirtualNode) => {
    if(typeof vNode === 'string' || typeof newNode === 'string'){
      if(vNode !== newNode){
        const nextNode = createElementFromVNode(newNode)
        container.replaceWith(nextNode)
        return nextNode
      }

      return container
    }

    if(vNode.tag !== newNode.tag){
      const nextNode = createElementFromVNode(newNode)
      container.replaceWith(nextNode)
      return nextNode
    }

    return container
  }
}
import {VDOM_CREATE_ELEMENT} from "./create-elements.js";
import type {IVirtualElement, IVirtualNode, IVirtualNodeProps} from "./types";

export class VDOM_UPDATE_ELEMENT{
  private static updateProp = (node: Node, key: string, newValue?: string) => {
    if(node instanceof Element) {
      if (newValue === undefined) {
        node.removeAttribute(key)
        return
      }
      node.setAttribute(key, newValue)
    }
  }

  private static updateProps = (node: Element, props: IVirtualNodeProps, newProps: IVirtualNodeProps) => {
    const mergedProps = {...props, ...newProps}

    for (const key in mergedProps){
      if(newProps[key] !== props[key]){
        this.updateProp(node, key, newProps[key])
      }
    }
  }

  static updateVNode = (container: Node, vNode: IVirtualNode, newNode: IVirtualNode) => {
    if(vNode.type === 'text' || newNode.type === 'text' || container instanceof Text){
      if(vNode !== newNode){
        const nextNode = VDOM_CREATE_ELEMENT.createElementFromVNode(newNode);
        (container as Element).replaceWith(nextNode)
        return nextNode
      }

      return container
    }

    const vElement = vNode as IVirtualElement
    const newElement = newNode as IVirtualElement

    if (vElement.tag !== newElement.tag) {
      const nextNode = VDOM_CREATE_ELEMENT.createElementFromVNode(newNode);
      (container as Element).replaceWith(nextNode)

      return nextNode
    }

    this.updateProps(container as Element, vElement.props, newElement.props)
    this.updateNestedElement(container, vElement.content as IVirtualElement[], newElement.content as IVirtualElement[])

    return container
  }
  private static updateNestedElement(
    node: Node,
    vNestedElements: IVirtualElement[],
    newNestedElements: IVirtualElement[]
  ){
    node.childNodes.forEach((element, index) => {
      this.updateVNode(element as Element, vNestedElements[index], newNestedElements[index])
    })

    newNestedElements.splice(vNestedElements.length).forEach(vElement => {
      node.appendChild(VDOM_CREATE_ELEMENT.createElementFromVNode(vElement))
    })

  }
}
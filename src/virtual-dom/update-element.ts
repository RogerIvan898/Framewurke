import VDOM_CREATE_ELEMENT from "./create-elements.js";
import type {CustomElement, IVirtualElement, IVirtualNode, IVirtualNodeProps} from "./types";
import {createListener} from "./event-listeners.js";

export default class VDOM_UPDATE_ELEMENT{
  private static updateProp = (node: Node, key: string, newValue?: string | Function) => {
    const element = node as CustomElement
    if(key.startsWith('on')){
      const eventName = key.slice(2).toLowerCase()
      if(newValue) element[eventName] = newValue

      if(!newValue) node.removeEventListener(eventName, createListener)
      else node.addEventListener(eventName, createListener)

      return
    }

    if(node instanceof Element) {
      if (newValue === undefined) {
        node.removeAttribute(key)
        return
      }
      if(typeof newValue === 'string') node.setAttribute(key, newValue)
      if(newValue instanceof Function) (node as CustomElement)[key] = newValue
    }
  }

  static updateProps = (node: Element, props: IVirtualNodeProps, newProps: IVirtualNodeProps) => {
    const propsKeys = new Set([...Object.keys(props), ...Object.keys(newProps)])
    for (const key of propsKeys){
      if(newProps[key] !== props[key]){
        VDOM_UPDATE_ELEMENT.updateProp(node, key, newProps[key])
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
    console.log('prevElement:', vElement.content.length, ' newElement', newNode)

    if (vElement.tag !== newElement.tag) {
      const nextNode = VDOM_CREATE_ELEMENT.createElementFromVNode(newNode);
      (container as Element).replaceWith(nextNode)

      return nextNode
    }


    this.updateProps(container as Element, vElement.props, newElement.props)
    this.updateNestedElement(container, vElement.content, newElement.content)

    return container
  }
  private static updateNestedElement(
    node: Node,
    vNestedElements: IVirtualNode[],
    newNestedElements: IVirtualNode[]
  ){
    node.childNodes.forEach((element, index) => {
      this.updateVNode(element as Element, vNestedElements[index], newNestedElements[index])
    })

    newNestedElements.splice(vNestedElements.length).forEach(vElement => {
      node.appendChild(VDOM_CREATE_ELEMENT.createElementFromVNode(vElement))
    })

  }
}
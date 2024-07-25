import VDOM_CREATE_ELEMENT from "./create-element.js";
import type {CustomElement, IVirtualElement, IVirtualNode, IVirtualNodeProps, VirtualNodePropsValue} from "./types";
import {createListener} from "./event-listeners.js";
import {ProcessingQueue} from "../processing-queue";

export default class VDOM_UPDATE_ELEMENT{
  private static updateProp = (node: Node, key: string, newValue?: VirtualNodePropsValue) => {
    const element = node as CustomElement

    if(key.startsWith('on') && newValue instanceof Function){
      VDOM_UPDATE_ELEMENT.updateEventProp(element, key, newValue)

      return
    }

    VDOM_UPDATE_ELEMENT.updateAttributeProp(element, key, newValue)

  }

  private static updateEventProp(element: CustomElement, key: string, newValue?: Function){
    const eventName = key.slice(2).toLowerCase()

    if(newValue){
      element[eventName] = newValue
      element.addEventListener(eventName, createListener)
    } else {
      element.removeEventListener(eventName, createListener)
    }
  }

  private static updateAttributeProp(element: Element, key: string, newValue?: string | number | Function){
    if(newValue === null || newValue === undefined){
      delete element[key]

      return
    }

    if(key === 'FOR' || key === 'IF'){
      ProcessingQueue.addProcess(key, element, newValue)
    }

    element[key] = newValue
  }

  static updateProps = (node: Element, props: IVirtualNodeProps, newProps: IVirtualNodeProps | unknown[]) => {
    const propsKeys = new Set([...Object.keys(props), ...Object.keys(newProps)])

     for (const key of propsKeys){
      const prevValue = props[key]
      const newValue = newProps[key]

      if(prevValue !== newValue) {
        if (key === 'class') {
          VDOM_UPDATE_ELEMENT.updateProp(node, 'className', newValue)
        } else {
          VDOM_UPDATE_ELEMENT.updateProp(node, key, newValue)
        }
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
      ProcessingQueue.processQueue()

      return nextNode
    }

    this.updateProps(container as Element, vElement.props, newElement.props)
    this.updateNestedElement(container, vElement.content, newElement.content)

    ProcessingQueue.processQueue()
  }

  private static updateNestedElement(
    node: Node,
    vNestedElements: IVirtualNode[],
    newNestedElements: IVirtualNode[]
  ){
    node.childNodes.forEach((element, index) => {
      if (index < newNestedElements.length) {
        this.updateVNode(element, vNestedElements[index], newNestedElements[index])
      } else {
        node.removeChild(element)
      }
    })

    newNestedElements.splice(vNestedElements.length).forEach(vElement => {
      node.appendChild(VDOM_CREATE_ELEMENT.createElementFromVNode(vElement))
    })
  }
}
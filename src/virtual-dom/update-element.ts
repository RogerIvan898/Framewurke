import VDOM_CREATE_ELEMENT from "./create-element.js";
import type {IVirtualElement, IVirtualNode, IVirtualNodeProps, VirtualNodePropsValue} from "./types";
import {createListener} from "./event-listeners.js";
import {ProcessingQueue} from "../processing-queue";
import {CUSTOMS} from "../customs";

export default class VDOM_UPDATE_ELEMENT{
  private static updateProp = (element: Element, key: string, newValue?: VirtualNodePropsValue) => {
    if(key.startsWith('on') && newValue instanceof Function){
      this.updateEventProp(element, key, newValue)
      return
    }

    this.updateAttributeProp(element, key, newValue)
  }

  private static updateEventProp(element: Element, key: string, newValue?: Function){
    const eventName = key.slice(2).toLowerCase()

    if(newValue){
      element[eventName] = newValue
      element.addEventListener(eventName, createListener)
      return
    }
    element.removeEventListener(eventName, createListener)
  }

  private static updateAttributeProp(element: Element, key: string, newValue?: VirtualNodePropsValue){
    let propKey = key

    if(newValue === null || newValue === undefined){
      delete element[propKey]
      element.removeAttribute(propKey)

      return
    }

    if(CUSTOMS.some(custom => custom.title === propKey)){
      ProcessingQueue.addProcess(propKey, element, newValue)
    }

    if(propKey === 'class' && typeof newValue === 'string'){
      propKey = 'className'
    }

    element[propKey] = newValue
  }

  public static updateProps = (node: Element, props: IVirtualNodeProps, newProps: IVirtualNodeProps | unknown[]) => {
    console.log(node, props, newProps)
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

  public static updateVNode = (container: Node, vNode: IVirtualNode, newNode: IVirtualNode) => {
    if(
      (vNode.type === 'text' || newNode.type === 'text') &&
      (container instanceof Element || container instanceof Text)){
      return VDOM_UPDATE_ELEMENT.updateTextNode(container, vNode, newNode)
    }

    return this.updateElementNode(container as Element, vNode, newNode)
  }

  private static updateTextNode(node: Element | Text, vNode: IVirtualNode, newNode: IVirtualNode){
    if(vNode !== newNode){
      const nextNode = VDOM_CREATE_ELEMENT.createElementFromVNode(newNode)
      node.replaceWith(nextNode)

      return nextNode
    }

    return node
  }

  private static updateElementNode(element: Element, vNode: IVirtualNode, newNode: IVirtualNode) {
    const vElement = vNode as IVirtualElement
    const newElement = newNode as IVirtualElement

    if (vElement.tag !== newElement.tag) {
      const nextNode = VDOM_CREATE_ELEMENT.createElementFromVNode(newNode)
      element.replaceWith(nextNode)
      ProcessingQueue.processQueue()

      return nextNode
    }

    if(element instanceof Element) {
      this.updateProps(element, vElement.props, newElement.props)
      this.updateNestedElement(element, vElement.content, newElement.content)
    }

    ProcessingQueue.processQueue()
    return element
  }

  public static updateNestedElement(
    node: Element,
    vNestedElements: IVirtualNode[],
    newNestedElements: IVirtualNode[]
  ){
    const nestedNodes = Array.from(node.childNodes) as (Element | Text)[]

    nestedNodes.forEach((element, index) => {
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
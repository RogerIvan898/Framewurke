import {VDOM_CREATE_ELEMENT} from "./create-elements.js";
import {VDOM_UPDATE_ELEMENT} from "./update-element.js";

export namespace VDom {
  export const mount = (node: Element, target: HTMLElement) => {
    target.replaceWith(node)
    return node
  }

  export const createElement = VDOM_CREATE_ELEMENT.createVElement
  export const createDomElement = VDOM_CREATE_ELEMENT.createElementFromVNode
  export const updateElement = VDOM_UPDATE_ELEMENT.updateVNode
  export const updateProp = VDOM_UPDATE_ELEMENT.updateProp
  export const updateProps = VDOM_UPDATE_ELEMENT.updateProps
}
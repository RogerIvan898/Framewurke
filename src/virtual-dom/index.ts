import VDOM_CREATE_ELEMENT from "./create-elements.js";
import {VDOM_UPDATE_ELEMENT} from "./update-element.js";

export class VDom{
  static mount(node: Node, target: HTMLElement) {
    target.replaceWith(node)
    return node
  }

  static createElement = VDOM_CREATE_ELEMENT.createVElement
  static createDomElement = VDOM_CREATE_ELEMENT.createElementFromVNode
  static updateElement = VDOM_UPDATE_ELEMENT.updateVNode
}
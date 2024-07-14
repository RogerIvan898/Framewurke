/// <reference path="./create-elements.ts"/>
/// <reference path="./update-element.ts"/>
import {VDOM_CREATE_ELEMENT} from "./create-elements.js";
import {VDOM_UPDATE_ELEMENT} from "./update-element.js";

export namespace VDom {
  export const mount = (node: Element | Text, target: HTMLElement) => {
    target.replaceWith(node)

    return node
  }

  export const createElement = VDOM_CREATE_ELEMENT.createVElement
  export const createDomElement = VDOM_CREATE_ELEMENT.createElementFromVNode
  export const updateElement = VDOM_UPDATE_ELEMENT.updateVNode
}
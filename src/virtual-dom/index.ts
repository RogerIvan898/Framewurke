import VDOM_CREATE_ELEMENT from "./create-element.js";
import VDOM_UPDATE_ELEMENT from "./update-element.js";
import {IVirtualNode} from "./types";

export default class VDom{
  public static mount(node: Node, target: HTMLElement) {
    target.replaceWith(node)
    return node
  }

  /**
   * Updates a DOM element based on the given virtual node.
   * @param {Node} container - DOM element or text node to update.
   * @param {IVirtualNode} virtualNode - The current virtual node representing the state before the update
   * @param {IVirtualNode} newVirtualNode - The new virtual node representing the state after the update
   * @return {HTMLElement | Text} - The updated DOM element or text node
   */
  public static updateElement = VDOM_UPDATE_ELEMENT.updateVNode

  public static createDomElement = VDOM_CREATE_ELEMENT.createElementFromVNode
  public static createElement = VDOM_CREATE_ELEMENT.createVirtualNode
}
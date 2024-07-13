import {VDOM_CREATE_ELEMENT} from "./create-elements.js";

export namespace VDOM_UPDATE_ELEMENT{
  import IVirtualNodeProps = VDom.IVirtualNodeProps;
  import IVirtualNode = VDom.IVirtualNode;
  import IVirtualElement = VDom.IVirtualElement;

  export const updateProp = (node: Element, key: string, newValue?: string) => {
    if(newValue === null || newValue === undefined){
      node.removeAttribute(key)

      return
    }

    node.setAttribute(key, newValue)
  }

  export const updateProps = (node: Element, props: IVirtualNodeProps, newProps: IVirtualNodeProps) => {
    const mergedProps = {...props, ...newProps}

    for (const key in Object.keys(mergedProps)){
      if(newProps[key] !== props[key]){
        updateProp(node, key, newProps[key])
      }
    }
  }

  export const updateVNode = (container: Element, vNode: IVirtualNode, newNode: IVirtualNode) => {
    if(typeof vNode === 'string' || typeof newNode === 'string'){
      if(vNode !== newNode){
        const nextNode = VDOM_CREATE_ELEMENT.createElementFromVNode(newNode)
        container.replaceWith(nextNode)

        return nextNode
      }

      return container
    }

    if(vNode.tag !== newNode.tag){
      const nextNode = VDOM_CREATE_ELEMENT.createElementFromVNode(newNode)
      container.replaceWith(nextNode)

      return nextNode
    }

    updateProps(container, vNode.props, newNode.props)
    updateNestedElement(container, vNode.content as IVirtualElement[], newNode.content as IVirtualElement[])

    return container
  }

  function updateNestedElement(
    node: Element,
    vNestedElements: IVirtualElement[],
    newNestedElements: IVirtualElement[]
  ){
    node.childNodes.forEach((_, index) => {
      updateVNode(node, vNestedElements[index], newNestedElements[index])
    })

    newNestedElements.splice(vNestedElements.length).forEach(vElement => {
      node.appendChild(VDOM_CREATE_ELEMENT.createElementFromVNode(vElement))
    })
    
  }
}
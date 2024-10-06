import type {IVirtualNode} from "../modules/virtual-dom/types";
import VDom from "../modules/virtual-dom";

export class VirtualDom{
  public static createApp(vRootNode: IVirtualNode, rootNode?: HTMLElement){
    const target = rootNode ?? document.getElementById('app')

    if (!target) {
      console.error('Target container not found. Please ensure an element with ID "app" exists.')
      return null
    }

    const appElement = VDom.createDomElement(vRootNode)
    const appInstance = VDom.mount(appElement, target)

    VDom.updateElement(appInstance, vRootNode, vRootNode)

    return appInstance
  }
}

import {IVirtualNode} from "../virtual-dom/types";
import {VDom} from "../virtual-dom";

export class Framewurke{
  public static createApp(vRootNode: IVirtualNode, rootNode?: HTMLElement){
    const target = rootNode ?? document.getElementById('app')

    if(target) {
      return VDom.mount(VDom.createDomElement(vRootNode), target) as Node
    }

    return null
  }
}
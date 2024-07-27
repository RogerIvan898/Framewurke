import type {IVirtualNode} from "../virtual-dom/types";
import VDom from "../virtual-dom";

export class Framewurke{
  public static createApp(vRootNode: IVirtualNode, rootNode?: HTMLElement){
    const target = rootNode ?? document.getElementById('app')

    if(target) {
      const app = VDom.mount(VDom.createDomElement(vRootNode), target)
      VDom.updateElement(app, vRootNode as IVirtualNode, vRootNode as IVirtualNode)
      return app
    }

    return null
  }
}
import type {IVirtualNode} from "../modules/virtual-dom/types";
import VDom from "../modules/virtual-dom";

export class VirtualDom{
  public static createApp(vRootNode: IVirtualNode, rootNode?: HTMLElement){
    const target = rootNode ?? document.getElementById('app')
    
    if(target) {
      const app = VDom.mount(VDom.createDomElement(vRootNode), target)
      VDom.updateElement(app, vRootNode, vRootNode)

      return app
    }

    return null
  }
}
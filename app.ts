import type {IVirtualNode} from "./src/virtual-dom/types";
import {VDom} from "./src/virtual-dom";

const createApp = (vRootElement: IVirtualNode) => {
  const target = document.getElementById('app')
  if(target){
    return VDom.mount(VDom.createDomElement(vRootElement), target) as Node
  }

  return null
}

let vRootElement = VDom.createElement('div', { id: 'app' }, [])
let app = createApp(vRootElement)

const num = Math.floor(Math.random() * 10).toString()
const newVElement = VDom.createElement('span', {}, [num])
const vNode = VDom.createElement('div', {}, ['Content: ', newVElement])

if(app) {
  app = VDom.updateElement(app, vRootElement, vNode)
}

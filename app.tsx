import {VirtualDom} from "./src/VirtualDom";
import VDom from "./src/modules/virtual-dom";
import {IVirtualNode} from "./src/modules/virtual-dom/types";

export const vNode = () => {
  return <div>80</div>
}

const vNode1 = (array: unknown[]) =>{
  const isVisible = true

  return (
    <div style={'border: 1px black solid'} class={'89'}>
      <vNode/>
      { array.map(item => <div>{item}</div>) }
      <div IF={isVisible}>*item</div>
    </div>
  )
}

let vApp = vNode1(['89', '89', '78']) as IVirtualNode
let app = VirtualDom.createApp(vApp)

setInterval(() => {
  const vNodeElement = vNode() as IVirtualNode
  app = VDom.updateElement(app, vApp, vNodeElement)
  vApp = vNodeElement
}, 1000)

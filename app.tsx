import {Framewurke} from "./src/Framewurke";
import type {IVirtualNode} from "./src/virtual-dom/types";
import VDom from "./src/virtual-dom";

export const vNode = () => {
  return <div/>
}

const isVisible = true

const vNode1 = (array: number[]) => {
  return (
    <div style={'border: 1px black solid'} class={'89'}>
      <vNode/>
      <div IF={isVisible} FOR={ item => array }>*item</div>
    </div>
  )
}

let vApp = vNode1([89, 98, 76]) as IVirtualNode
let app = Framewurke.createApp(vApp as IVirtualNode)

setInterval(() => {
  let vNodeElement = vNode() as IVirtualNode
  app = VDom.updateElement(app, vApp, vNodeElement)
  vApp = vNodeElement
}, 1000)
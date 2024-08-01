import {Framewurke} from "./src/Framewurke";
import VDom from "./src/virtual-dom";
import {IVirtualNode} from "./src/virtual-dom/types";

export const vNode = () => {
  return <div/>
}

const vNode1 = (array: unknown[]) =>{
  const isVisible = true
  const arr = ['item', 87, 67]

  return (
    <div style={'border: 1px black solid'} class={'89'}>
      <vNode/>
      { arr.map(item => <div>{item}</div>) }
      <div IF={isVisible}>*item</div>
    </div>
  )
}

let vApp = vNode1([89, 89, 78]) as IVirtualNode
let app = Framewurke.createApp(vApp)

setInterval(() => {
  const vNodeElement = vNode() as IVirtualNode

  app = VDom.updateElement(app, vApp, vNodeElement)
  vApp = vNodeElement
}, 1000)
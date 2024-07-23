import {Framewurke} from "./src/Framewurke";
import type {IVirtualNode} from "./src/virtual-dom/types";
import VDom from "./src/virtual-dom";

interface IProps {
  id: number
}

export const vNode = () => {
  return <div/>
}

const vNode1 = () => {
  return (
    <span class={'89'}>
      <vNode/>
      <div FOR={[89,89,89]}>89</div>
    </span>
  )
}

const node = vNode()

let app = Framewurke.createApp(node as IVirtualNode)

if(app) {
  VDom.updateElement(app, node as IVirtualNode, vNode1() as IVirtualNode)
}
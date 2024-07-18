import {Framewurke} from "./src/Framewurke";
import {IVirtualNode} from "./src/virtual-dom/types";
import VDom from "./src/virtual-dom";

const vNode = () => {
  return <div>Text</div>
}

const vNode1 = () => {
  return (
    <span class={'89'} contentEditable={true}>
      <div>89</div>
    </span>
  )
}

const node = vNode()

let app = Framewurke.createApp(node as IVirtualNode)

if(app) {
  VDom.updateElement(app, node as IVirtualNode, vNode1() as IVirtualNode)
}
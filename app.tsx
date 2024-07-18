import {Framewurke} from "./src/Framewurke";
import {IVirtualNode} from "./src/virtual-dom/types";

const vNode = () => {
  return <div>Text</div>
}

let app = Framewurke.createApp(vNode() as IVirtualNode)
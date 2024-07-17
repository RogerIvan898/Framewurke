// import {VDom} from "./src/virtual-dom";
import {Framewurke} from "./src/Framewurke";
import {IVirtualNode} from "./src/virtual-dom/types";

// const vRootElement = VDom.createElement('div', { id: 'app' }, [
//   'text'
// ])

const vNode = () => {
  return <div>Text</div>
}

let app = Framewurke.createApp(vNode() as IVirtualNode)
// const vNode = VDom.createElement('div', { id: 'app' }, [
//   'Content: ',
//   VDom.createElement('div', { onClick: () => {}, id: 'div' }, [
//     VDom.createElement('span', { className : 'app' }, [Math.floor(Math.random() * 10).toString()])
//     ])
// ])
//
// if(app) {
//   app = VDom.updateElement(app, vRootElement)
// }
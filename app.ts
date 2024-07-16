import {VDom} from "./src/virtual-dom";
import {Framewurke} from "./src/Framewurke";

const vRootElement = VDom.createElement('div', { id: 'app' }, [
  'text'
])

console.log(vRootElement)

let app = Framewurke.createApp(vRootElement)

const vNode = VDom.createElement('div', { id: 'app' }, [
  'Content: ',
  VDom.createElement('div', { onClick: () => {}, id: 'div' }, [
    VDom.createElement('span', { className : 'app' }, [Math.floor(Math.random() * 10).toString()])
    ])
])

if(app) {
  app = VDom.updateElement(app, vRootElement, vNode)
}
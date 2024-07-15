import {VDom} from "./src/virtual-dom";
import {Framewurke} from "./src/Framewurke";

const vRootElement = VDom.createElement('div', { id: 'app' })

let app = Framewurke.createApp(vRootElement)

const vNode = VDom.createElement('div', {}, [
  'Content: ',
  VDom.createElement('span', [Math.floor(Math.random() * 10).toString()],)
])

if(app) {
  app = VDom.updateElement(app, vRootElement, vNode)
}

import {VDom} from "./virtual-dom/virtual-dom.js";

const target = document.getElementById('app')

let app: Node | null = null

let vNode = VDom.createElement('div', {id: '89'}, ['Text'])

if(target) {
  app = VDom.mount(VDom.createDomElement(vNode) as Element, target)
}

const num = Math.floor(Math.random() * 10).toString()

const newNode = VDom.createElement('span', {id: 'app'}, [num])
app = VDom.updateElement(app as Element, vNode, newNode)

vNode = newNode
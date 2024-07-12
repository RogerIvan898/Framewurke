import {VDom} from "./virtual-dom/virtual-dom.js";

const vNode = VDom.createVElement('div', {id: 'app'}, ['text'])
const vNode1 = VDom.createVElement('span', {id: 'app'}, ['Text'])

const dom = VDom.createElementFromVNode(vNode) as HTMLElement
const target = document.getElementById('app')

if(target) VDom.mount(dom, target)

VDom.updateVNode(dom, vNode, vNode1)
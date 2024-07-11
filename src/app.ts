import {VDom} from "./virtual-dom/virtual-dom.js";

const vNode = VDom.createVElement('div', {id: 'app'}, ['text'])
const dom = VDom.createElementFromVNode(vNode) as HTMLElement
const target = document.getElementById('app')
const vNode1 = VDom.createVElement('span', {id: 'app'}, ['Text'])

if(target) VDom.mount(dom, target)

VDom.upDateVNode(dom, vNode, vNode1)
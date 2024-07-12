import {VDom} from "./virtual-dom/virtual-dom";

const vNode = VDom.createElement('div', {id: 'app'}, ['text'])
const vNode1 = VDom.createElement('span', {id: 'app'}, ['Text'])

const dom = VDom.createDomElement(vNode) as HTMLElement
const target = document.getElementById('app')

if(target) VDom.mount(dom, target)

VDom.updateElement(dom, vNode, vNode1)
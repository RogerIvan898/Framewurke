import {IVirtualElement} from "./virtual-dom/virtual-dom.types";
import {createElementFromVNode, mount} from "./virtual-dom/virtual-dom";

const virtualDom: IVirtualElement = {
  tag: 'div',
  props: { 'id': '89' },
  content: ['text']
}

const dom = createElementFromVNode(virtualDom)
const targer = document.getElementById('app')
if(targer) mount(dom, targer)
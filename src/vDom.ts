interface IVirtualNodeProps{
  [key: string]: string
}

interface IVirtualElement{
  tag: string
  content?: IVirtualNode[]
  props?: IVirtualNodeProps
}

type IVirtualNode = IVirtualElement | string

const virtualDom: IVirtualElement = {
  tag: 'div',
  props: {'id': '89'},
  content: ['text']
}

const createVElement = (
                        tag: string,
                        props: IVirtualNodeProps = {},
                        content:  IVirtualNode[] = []
): IVirtualElement => {
  return { tag, props, content }
}

const createElementFromVNode = (vNode: IVirtualNode | string) => {
  if(typeof vNode === 'string'){
    return document.createTextNode(vNode)
  }

  const { tag, props = [], content = [] } = vNode

  const element = document.createElement(tag)

  for (const [key, value] of Object.entries(props)){
    element.setAttribute(key, value)
  }

  for(const nestedElement of content){
    element.appendChild(createElementFromVNode(nestedElement))
  }

  return element
}

const mount = (node: Node, target: HTMLElement) => {
  target.replaceWith(node)
  return node
}
const dom = createElementFromVNode(virtualDom)
const target = document.getElementById('app')
if (target) mount(dom, target)
console.log(virtualDom)
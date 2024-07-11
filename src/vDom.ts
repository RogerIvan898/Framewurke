interface IVirtualNodeProps{
  [key: string]: string
}

interface IVirtualElement{
  type: 'element'
  tag: string
  content?: IVirtualElement[] | string[]
  props?: IVirtualNodeProps
}
type IVirtualNode = IVirtualElement

const virtualDom: IVirtualElement = {
  type: 'element',
  tag: 'div',
  props: {'id': '89'},
  content: ['text']
}

const createVElement = (
                        tag: string,
                        props: IVirtualNodeProps = {},
                        content:  IVirtualNode[] = []
): IVirtualElement => {
  return { tag, props, content, type: 'element' }
}

const createElementFromVNode = (vNode: IVirtualNode | string) => {
  if(typeof vNode === 'string'){
    return document.createTextNode(vNode)
  }

  const { tag, props, content } = vNode

  const element = document.createElement(tag)

  if(props) {
    Object.keys(props).forEach(key => {
      element.setAttribute(key, props[key])
    })
  }

  if(content) content?.forEach(el => element.appendChild(createElementFromVNode(el)))

  return element
}

const dom = createElementFromVNode(virtualDom)
document.body.appendChild(dom)

const mount = (node: Node, target: HTMLElement) => {
  target.replaceWith(node)
  return node
}
console.log(virtualDom)
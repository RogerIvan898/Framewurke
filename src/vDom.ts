export {}

interface IVirtualNodeProps{
  [key: string]: string
}

interface IVirtualNode{
  type: 'text' | 'element'
}

interface IVirtualText extends IVirtualNode{
  type: 'text'
  content: string
}

interface IVirtualElement extends IVirtualNode{
  tag: string
  content?: (IVirtualElement | IVirtualText)[]
  props?: IVirtualNodeProps
}

const virtualDom: IVirtualElement = {
  type: 'element',
  tag: 'div',
  content: [{
    type: 'text',
    content: 'text',
  }]
}

const createVDomElement = (tag: string, props?: IVirtualNodeProps) => {
  const element = document.createElement(tag)

  if(props) {
    Object.keys(props ?? {}).forEach(key => {
      element.setAttribute(key, props[key])
    })
  }

  return element
}

const createDomElementFromVirtual = (vNode: IVirtualNode): Node => {
  if(vNode.type === 'element'){
    const vElement = vNode as IVirtualElement
    const element = createVDomElement(vElement.tag, vElement.props ?? {})

    vElement.content?.forEach(childNode => {
      element.appendChild(createDomElementFromVirtual(childNode))
    })

    return element
  }
  else if(vNode.type === 'text'){
    const vText = vNode as IVirtualText

    return document.createTextNode(vText.content)
  }

  throw new Error('Unknown virtual node type')
}

const dom = createDomElementFromVirtual(virtualDom)
document.body.appendChild(dom)
export const FOR_ATTRIBUTE = (element: Element, fn: Function) => {
  const itemTitle = getArrayFunctionArguments(fn)
  if(!itemTitle){
    console.error('FOR argument did not find')
    return
  }
  const array = fn()

  if(!element.parentElement){
    return
  }

  array.forEach(item => {
    const newElement = element.cloneNode(true)

    if(newElement instanceof HTMLElement) {
      newElement.innerHTML = newElement.innerHTML.replace(`*${itemTitle}`, String(item))
      element.parentNode.appendChild(newElement)
    } else {
      console.error('Rendered element is not an HTMLElement', newElement)
    }
  })

  element.parentNode.removeChild(element)
}

function getArrayFunctionArguments(fn: Function){
  const fnStr = fn.toString()
  const match = fnStr.match(/^\s*([\w\d_$]+)\s*=>/)

  if (match) {
    return match[1]
  }

  return null
}
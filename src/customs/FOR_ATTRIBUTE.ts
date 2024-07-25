export const FOR_ATTRIBUTE = (element: Element, fn: Function) => {
  const itemTitle = getArrayFunctionArguments(fn)
  const array = fn()

  console.log(element.parentNode, itemTitle)

  if(!element.parentElement){
    return
  }

  array.forEach(item => {
    const newElement = element.cloneNode(true) as HTMLElement
    newElement.innerHTML =
      newElement.innerHTML.replace(`*${itemTitle}`, String(item))
    element.parentNode.appendChild(newElement)
  })
  element.parentNode.removeChild(element)
}

function getArrayFunctionArguments(fn: Function){
  const fnStr = fn.toString()
  const match = fnStr.match(/^\s*([\w\d_$]+)\s*=>/);

  if (match) {
    return match[1];
  }

  return null;
}
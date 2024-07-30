import {getArrayFunctionArguments} from "../helpers";

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

  array.forEach((item, index) => {
    const newElement = element.cloneNode(true)

    if(newElement instanceof HTMLElement) {
      newElement.innerHTML = processTemplate(newElement.innerHTML, item, index)
      element.parentNode.appendChild(newElement)
    } else {
      console.error('Rendered element is not an HTMLElement', newElement)
    }
  })

  element.parentNode.removeChild(element)
}

function processTemplate(template: string, item: any, index: number): string {
  return template.replace(/\{([^}]+)\}/g, (_, expression) => {
    try {
      const func = new Function('item', 'index', `return ${expression}`);
      return String(func(item, index));
    } catch (error) {
      console.error('Error evaluating expression:', expression, error);
      return '';
    }
  })
}


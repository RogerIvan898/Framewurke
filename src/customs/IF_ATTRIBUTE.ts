export const IF_ATTRIBUTE = (element: Element, toggle: boolean) => {
  if(element instanceof HTMLElement) {
    element.style.display = toggle ? 'block' : 'none'
  } else {
    console.error('Provided element is not an HTMLElement')
  }
}
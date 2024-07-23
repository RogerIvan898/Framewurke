export const FOR_ATTRIBUTE = (element: Element, array: unknown[]) => {
  array.forEach(item => {
    const newElement = element.cloneNode(true)
    newElement.textContent = String(item)
    element.appendChild(newElement)
  })
}
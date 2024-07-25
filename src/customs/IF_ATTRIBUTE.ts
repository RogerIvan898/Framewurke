export const IF_ATTRIBUTE = (element: Element, toggle: boolean) => {
  (element as HTMLElement).style.display = toggle ? 'block' : 'none'
}
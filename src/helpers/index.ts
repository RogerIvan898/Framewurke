import {IVirtualNode, IVirtualText} from "../modules/virtual-dom/types";

export const isNullOrUndefined = (value: unknown) => {
  return value === null || value === undefined
}

export const getArrayFunctionArguments = (fn: Function) =>{
  const fnStr = fn.toString()
  const match = fnStr.match(/^\s*([\w\d_$]+)\s*=>/)

  return match ? match[1] : null
}
export function isVirtualTextNode(node: IVirtualNode): node is IVirtualText{
     return node.type === 'text'
}

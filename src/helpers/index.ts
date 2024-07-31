export const isNullOrUndefined = (value: unknown) => {
  return value === null || value === undefined
}

export const getArrayFunctionArguments = (fn: Function) =>{
  const fnStr = fn.toString()
  const match = fnStr.match(/^\s*([\w\d_$]+)\s*=>/)

  if (match) {
    return match[1]
  }

  return null
}
type QueueProcess = {
  type: string,
  element: Element,
  arg: unknown
}

export type TypeProcessingQueue = QueueProcess[]

export type QueueProcessHandler = (element: Element, arg: unknown) => void

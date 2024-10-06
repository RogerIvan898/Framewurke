interface IEventHandler {
  [eventType: string]: (event: Event) => void
}

export function createListener(this: IEventHandler, event: Event) {
  const handler = this[event.type as keyof IEventHandler]

  if(typeof handler !== 'function'){
    console.error(`No event handler found: ${event.type}`)
    return
  }

  return handler(event)
}

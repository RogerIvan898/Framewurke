interface IEventHandler {
  [eventType: string]: (event: Event) => void
}

export function createListener(this:IEventHandler, event: Event) {
  return this[event.type](event)
}
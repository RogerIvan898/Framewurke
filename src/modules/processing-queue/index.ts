import {FOR_ATTRIBUTE} from "../../customs/FOR_ATTRIBUTE.js";
import type {QueueProcessHandler, TypeProcessingQueue} from "./types";
import {IF_ATTRIBUTE} from "../../customs/IF_ATTRIBUTE.js";

export class ProcessingQueue {
  private static queue: TypeProcessingQueue = []

  public static addProcess(type: string, element: Element, arg: unknown) {
    if (!element) {
      console.error("Invalid element provided to addProcess.")
      return
    }

    ProcessingQueue.queue.push({ type, element, arg })
  }

   public static processQueueAfterPageLoad(){
    if (document.readyState === 'complete') {
      ProcessingQueue.processQueue()
      return
    }
    window.addEventListener('load', ProcessingQueue.processQueue, { once: true })
   }

  public static processQueue() {
    const typeHandlers: {[key: string]: QueueProcessHandler} = {
      'FOR': ProcessingQueue.processFORType,
      'IF': ProcessingQueue.processIFType
    }

    ProcessingQueue.queue.forEach(({type, element, arg}) => {
      const handler = typeHandlers[type]

      if(handler){
        handler(element, arg)
      } else {
        console.error(`Unknown type: ${type}. Please check the type and try again.`)
      }
    })

    ProcessingQueue.queue = []
  }

  private static processFORType(element: Element, arg: unknown) {
    if (typeof arg !== 'function') {
      if (element.parentNode) {
        FOR_ATTRIBUTE(element, arg as Function)
      }
    } else {
      console.error('FOR argument is not a function')
    }
  }

  private static processIFType(element: Element, arg: unknown) {
    if (typeof arg === 'boolean') {
      IF_ATTRIBUTE(element, arg)
    } else {
      console.error('IF argument is not a boolean')
    }
  }
}

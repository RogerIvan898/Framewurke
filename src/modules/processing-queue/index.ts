import {FOR_ATTRIBUTE} from "../../customs/FOR_ATTRIBUTE.js";
import type {TypeProcessingQueue} from "./types";
import {IF_ATTRIBUTE} from "../../customs/IF_ATTRIBUTE.js";

export class ProcessingQueue {
  private static processingQueue: TypeProcessingQueue = []

  public static addProcess(type: string, element: Element, arg: unknown) {
    ProcessingQueue.processingQueue.push({ type, element, arg })
  }

   public static processQueueAfterPageLoad(){
    if (document.readyState === 'complete') {
      ProcessingQueue.processQueue()
      return
    }
    window.addEventListener('load', ProcessingQueue.processQueue, { once: true })
   }

  public static processQueue() {
    ProcessingQueue.processingQueue.forEach(({type, element, arg}) => {
      switch (type) {
        case 'FOR': ProcessingQueue.processFORType(element, arg); break
        case 'IF': ProcessingQueue.processIFType(element, arg); break
        default: console.error(`Unknown type ${type}`); break
      }
    })

    ProcessingQueue.processingQueue = []
  }

  private static processFORType(element: Element, arg: unknown) {
    if (arg instanceof Function) {
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
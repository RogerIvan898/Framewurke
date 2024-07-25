import {FOR_ATTRIBUTE} from "../customs/FOR_ATTRIBUTE.js";
import {TypeProcessingQueue} from "./types";
import {IF_ATTRIBUTE} from "../customs/IF_ATTRIBUTE.js";

export class ProcessingQueue{
  private static processingQueue: TypeProcessingQueue = []

  static addProcess(type: string, element: Element, arg: unknown) {
    ProcessingQueue.processingQueue.push({type, element, arg})
  }

  static processQueue(){
      ProcessingQueue.processingQueue.forEach(({type, element, arg}) => {
      if(type === 'FOR' && arg instanceof Function) {
        if (element.parentNode) {
          FOR_ATTRIBUTE(element, arg as Function)
        }
      }
      if(type === 'IF' && typeof arg === 'boolean'){
        IF_ATTRIBUTE(element, arg)
      }
    })

    ProcessingQueue.processingQueue = []
  }
}
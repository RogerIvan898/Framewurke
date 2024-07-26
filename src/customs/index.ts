import {FOR_ATTRIBUTE} from "./FOR_ATTRIBUTE.js";
import {IF_ATTRIBUTE} from "./IF_ATTRIBUTE.js";

interface ICustom {
  title: string
  fn: Function
}

export const CUSTOMS: ReadonlyArray<ICustom> = Object.freeze([
  {title: 'FOR', fn: FOR_ATTRIBUTE},
  {title: 'IF', fn: IF_ATTRIBUTE}
])
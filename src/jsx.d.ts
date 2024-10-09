import {IVirtualNode} from "./modules/virtual-dom/types";

declare namespace JSX{
  interface IntrinsicElements{
    div: Partial<IHtmlElementAttributes>,
    span: Partial<IHtmlElementAttributes>
    [elementName: string]: any
  }
  type Element = IVirtualNode
}

interface IHtmlElementAttributes extends IHtmlElementListeners{
  accessKey : string
  autoCapitalize : 'off' | 'none' | 'on' | 'sentences' | 'words' | 'characters'
  class : string
  contentEditable : boolean | 'inherit'
  dir : 'rtl' | 'ltr' | 'auto'
  draggable : boolean
  hidden : boolean
  id : string | number
  lang : string
  slot : string
  spellCheck : boolean
  //style
  tabIndex : string
  title : string
  translate : 'yes' | 'no'
  role : string
  //RDFa Attributes
  about : string
  datatype : string
  inlist : string
  prefix : string
  property : string
  resource : string
  typeof : string
  vocab : string

  style : string

  itemProp : string
  itemScope : string
  itemType : string
  itemID : string
  itemRef : string

  FOR : (item) => Array<unknown>
  IF : boolean
}

interface IHtmlElementListeners{
  onSubmit : Function
  onInvalid : Function
  onLoad : Function
  onError : Function
  onKeyDown : Function
  onKeyPress : Function
  onKeyUp : Function
  onAbort : Function
  onCapPlay : Function
  onCopy : Function
  onCut : Function
  onClick : Function
  onPaste : Function
  onFocus : Function
  onBlur : Function
  onChange : Function
  onInput : Function
  onReset : Function
  onCanPlayThrough : Function
  onDurationChange : Function
  onEmptied : Function
  onEnded : Function
  onLoadedData : Function
  onLoadedMetaData : Function
  onLoadStart : Function
  onPause : Function
  onPlay : Function
  onPlaying : Function
  onProgress : Function
  onSeeked : Function
  onSeeking : Function
  onStalled : Function
  onSuspend : Function
  onTimeUpdate : Function
  onVolumeChange : Function
  onWaiting : Function
  onAuxClick : Function
  onContextMenu : Function
  onDoubleClick : Function
  onDrag : Function
  onDragEnd : Function
  onDragEnter : Function
  onDragExit : Function
  onDragLeave : Function
  onDragOver : Function
  onDragStart : Function
  onDrop : Function
  onMouseDown : Function
  onMouseEnter : Function
  onMouseLeave : Function
  onMouseMove : Function
  onMouseCapture : Function
  onMouseOut : Function
  onMouseOver : Function
  onMouseUp : Function
  onSelect : Function
  onEncrypted : Function
  onPointerDown : Function
  onPointerMove : Function
  onPointerUp : Function
  onPinterCancel : Function
}

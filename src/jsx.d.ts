declare namespace JSX{
  interface IntrinsicElements{
    div: Partial<IHtmlElementAttributes>,
    span: Partial<IHtmlElementAttributes>
    [elementName: string]: any
  }
}

interface IHtmlElementAttributes extends IHtmlElementListeners{
  accessKey?: string
  autocapitalize?: 'off' | 'none' | 'on' | 'sentences' | 'words' | 'characters'
  class?: string
  contentEditable?: boolean | 'inherit'
  dir?: 'rtl' | 'ltr' | 'auto'
  draggable?: boolean
  hidden?: boolean
  id?: string | number
  lang?: string
  slot?: string
  spellCheck?: boolean
  //style
  tabIndex?: string
  title?: string
  translate?: 'yes' | 'no'

  role?: string

  //RDFa Attributes
  about?: string
  datatype?: string
  inlist?: string
  prefix?: string
  property?: string
  resource?: string
  typeof?: string
  vocab?: string
}

interface IHtmlElementListeners{
  onClick: Function
}
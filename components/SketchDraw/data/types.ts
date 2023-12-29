export type UserMode = 'select' | CanvasObjectType

export type ActionModeType =
  | 'isDrawing'
  | 'isPanning'
  | 'isMoving'
  | 'isResizing'
  | 'isRotating'
  | 'isWriting'
export type ActionModeOption =
  | 'topLeft'
  | 'topCenter'
  | 'topRight'
  | 'middleLeft'
  | 'middleRight'
  | 'bottomLeft'
  | 'bottomCenter'
  | 'bottomRight'

export type ActionMode = null | {
  type: ActionModeType
  option: ActionModeOption | null
}

export interface ObjectDimensions {
  x: number
  y: number
  width: number
  height: number
}

export interface ScrollPosition {
  x: number
  y: number
}

// BEGIN: canvas related types
export interface CanvasWorkingSize {
  width: number
  height: number
}

export type CanvasObjectFreeDrawType = 'pencil' | 'highlighter' | 'eraser'
export type CanvasObjectShapeType = 'square' | 'circle' | 'triangle'
export type CanvasObjectType =
  | CanvasObjectFreeDrawType
  | CanvasObjectShapeType
  | 'text'
  | 'icon'
  | 'image'

export interface CanvasObject {
  // Common
  type: CanvasObjectType
  id: string
  x: number
  y: number
  width: number
  height: number
  opacity: number
  // Type specific
  backgroundColorHex: string
  strokeColorHex: string
  strokeWidth: number
  borderRadius: number
  freeDrawPoints: { x: number; y: number }[] // FreeDraw ONLY
  text: string // Text ONLY
  textJustify: boolean // Text ONLY
  textAlignHorizontal: 'left' | 'center' | 'right' // Text ONLY
  textAlignVertical: 'top' | 'middle' | 'bottom' // Text ONLY
  fontColorHex: string // Text ONLY
  fontSize: number // Text ONLY
  fontFamily: string // Text ONLY
  fontStyle: 'normal' | 'italic' | 'oblique' // Text ONLY
  fontVariant: 'normal' | 'small-caps' // Text ONLY
  fontWeight:
    | 'normal'
    | 'bold'
    | 'bolder'
    | 'lighter'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900' // Text ONLY
  fontLineHeightRatio: number // Text ONLY
  svgPath: string // Icon ONLY
  imageUrl: string // Image ONLY
  imageElement: HTMLImageElement | null // Image only
}

type ObjectCommonProperties = Pick<
  CanvasObject,
  'x' | 'y' | 'width' | 'height' | 'opacity'
> & { id?: string }

export type ShapeObject = ObjectCommonProperties & {
  type: CanvasObjectShapeType
} & Pick<
    CanvasObject,
    'backgroundColorHex' | 'strokeColorHex' | 'strokeWidth' | 'borderRadius'
  >

export type FreeDrawObject = ObjectCommonProperties & {
  type: CanvasObjectFreeDrawType
} & Pick<CanvasObject, 'strokeColorHex' | 'strokeWidth' | 'freeDrawPoints'>

export type TextObject = ObjectCommonProperties & {
  type: 'text'
} & Pick<
    CanvasObject,
    | 'text'
    | 'textJustify'
    | 'textAlignHorizontal'
    | 'textAlignVertical'
    | 'fontColorHex'
    | 'fontSize'
    | 'fontFamily'
    | 'fontStyle'
    | 'fontVariant'
    | 'fontWeight'
    | 'fontLineHeightRatio'
  >

export type IconObject = ObjectCommonProperties & {
  type: 'icon'
} & Pick<CanvasObject, 'backgroundColorHex' | 'svgPath'>

export type ImageObject = ObjectCommonProperties & {
  type: 'image'
} & Pick<CanvasObject, 'imageUrl' | 'imageElement'>
// END: canvas related types

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

export type ShapeType = 'fill' | 'outline'

// BEGIN: object related types
type ShapeBasedCommonOptions = {
  shapeType: ShapeType
  fillColorHex: string
  strokeThickness: number
  strokeColorHex: string
  opacity: number
}
type PointBasedCommonOptions = {
  lineCap: 'butt' | 'round' | 'square'
  lineJoin: 'miter' | 'round' | 'bevel'
  strokeThickness: number
  strokeColorHex: string
  opacity: number
}
export type CircleOptions = ShapeBasedCommonOptions // can extend if required. Ex: ShapeCommonOptions & { something: type }
export type SquareOptions = ShapeBasedCommonOptions
export type TriangleOptions = ShapeBasedCommonOptions
export type EraserOptions = PointBasedCommonOptions
export type HighlighterOptions = PointBasedCommonOptions
export type PencilOptions = PointBasedCommonOptions
export type TextOptions = {
  text: string
  fontFamily: string
  fontSize: number
  fontColorHex: string
}
export type IconOptions = {
  bgColorHex: string
  svgPath: string
}
export type ImageOptions = {
  imageUrl: string
  imageElement: HTMLImageElement | null
}

// END: object related types

// BEGIN: canvas related types
export interface CanvasWorkingSize {
  width: number
  height: number
}

export type CanvasObjectType =
  | 'pencil'
  | 'highlighter'
  | 'eraser'
  | 'square'
  | 'circle'
  | 'triangle'
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
  points?: { x: number; y: number }[] // Only for pencil, highlighter, and eraser
  eraserOpts?: EraserOptions
  pencilOpts?: PencilOptions
  highlighterOpts?: HighlighterOptions
  circleOpts?: CircleOptions
  squareOpts?: SquareOptions
  triangleOpts?: TriangleOptions
  textOpts?: TextOptions
  iconOpts?: IconOptions
  imageOpts?: ImageOptions
}

export type CommonObjectProperties = Pick<
  CanvasObject,
  'x' | 'y' | 'width' | 'height'
> & { id?: string }

export type EraserObject = CommonObjectProperties & {
  type: 'eraser'
} & Pick<CanvasObject, 'eraserOpts' | 'points'>

export type PencilObject = CommonObjectProperties & {
  type: 'pencil'
} & Pick<CanvasObject, 'pencilOpts' | 'points'>

export type HightlighterObject = CommonObjectProperties & {
  type: 'highlighter'
} & Pick<CanvasObject, 'highlighterOpts' | 'points'>

export type CircleObject = CommonObjectProperties & {
  type: 'circle'
} & Pick<CanvasObject, 'circleOpts'>

export type SquareObject = CommonObjectProperties & {
  type: 'square'
} & Pick<CanvasObject, 'squareOpts'>

export type TriangleObject = CommonObjectProperties & {
  type: 'triangle'
} & Pick<CanvasObject, 'triangleOpts'>

export type TextObject = CommonObjectProperties & {
  type: 'text'
} & Pick<CanvasObject, 'textOpts'>

export type IconObject = CommonObjectProperties & {
  type: 'icon'
} & Pick<CanvasObject, 'iconOpts'>

export type ImageObject = CommonObjectProperties & {
  type: 'image'
} & Pick<CanvasObject, 'imageOpts'>
// END: canvas related types

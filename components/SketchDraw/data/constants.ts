import {
  CanvasObject,
  CircleOptions,
  EraserOptions,
  HighlighterOptions,
  IconOptions,
  ImageOptions,
  PencilOptions,
  SquareOptions,
  TextOptions,
  UserMode
} from './types'

export const CANVAS_ID: string = 'im-aisketch-canvas'
export const OBJECTS_STORAGE_KEY = 'im-sd-objects'
export const BG_STORAGE_KEY = 'im-sd-bg'
export const PRIMARY_COLOR_HEX = '#ffc40c'

export const PALETTE_COLORS: string[] = [
  '#000000',
  '#f24822',
  '#ffcd29',
  '#14ae5c',
  '#0d99ff',
  '#9747ff'
]

export const COMMON_DEFAULT = {
  canvasBackgroundColor: '#ffffff',
  canvasObjectColor: '#000000',
  userMode: 'select' as UserMode
}

export const CIRCLE_OPTIONS_DEFAULT: CircleOptions = {
  shapeType: 'fill',
  fillColorHex: COMMON_DEFAULT.canvasObjectColor,
  strokeThickness: 0,
  strokeColorHex: COMMON_DEFAULT.canvasObjectColor,
  opacity: 100
}

export const SQUARE_OPTIONS_DEFAULT: SquareOptions = {
  shapeType: 'fill',
  fillColorHex: COMMON_DEFAULT.canvasObjectColor,
  strokeThickness: 0,
  strokeColorHex: COMMON_DEFAULT.canvasObjectColor,
  opacity: 100
}

export const TRIANGLE_OPTIONS_DEFAULT: SquareOptions = {
  shapeType: 'fill',
  fillColorHex: COMMON_DEFAULT.canvasObjectColor,
  strokeThickness: 0,
  strokeColorHex: COMMON_DEFAULT.canvasObjectColor,
  opacity: 100
}
export const ERASER_OPTIONS_DEFAULT: EraserOptions = {
  lineCap: 'round',
  lineJoin: 'round',
  strokeThickness: 10,
  strokeColorHex: COMMON_DEFAULT.canvasBackgroundColor,
  opacity: 100
}
export const PENCIL_OPTIONS_DEFAULT: PencilOptions = {
  lineCap: 'round',
  lineJoin: 'round',
  strokeThickness: 1,
  strokeColorHex: COMMON_DEFAULT.canvasObjectColor,
  opacity: 100
}
export const HIGHLIGHTER_OPTIONS_DEFAULT: HighlighterOptions = {
  lineCap: 'butt',
  lineJoin: 'round',
  strokeThickness: 20,
  strokeColorHex: COMMON_DEFAULT.canvasObjectColor,
  opacity: 55
}
export const TEXT_OPTIONS_DEFAULT: TextOptions = {
  text: 'text here',
  fontFamily: 'sans-serif',
  fontSize: 30,
  fontColorHex: COMMON_DEFAULT.canvasObjectColor
}
export const ICON_OPTIONS_DEFAULT: IconOptions = {
  svgPath: '',
  bgColorHex: COMMON_DEFAULT.canvasObjectColor
}
export const IMAGE_OPTIONS_DEFAULT: ImageOptions = {
  imageUrl: '',
  imageElement: null
}

export const CANVAS_OBJECT_DEFAULT: Omit<CanvasObject, 'id' | 'type'> = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  opacity: 100
}

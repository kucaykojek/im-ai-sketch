import {
  CanvasObject,
  CircleOptions,
  EraserOptions,
  HighlighterOptions,
  IconOptions,
  ImageOptions,
  PencilOptions,
  ShapeType,
  SquareOptions,
  TextOptions,
  UserMode
} from './types'

export const CANVAS_ID: string = 'im-aisketch-canvas'
export const OBJECTS_STORAGE_KEY = 'im-sd-objects'
export const BG_STORAGE_KEY = 'im-sd-bg'

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
  selectedColor: '#000000',
  userMode: 'select' as UserMode,
  shapeType: 'fill' as ShapeType,
  strokeWidth: {
    pencil: 1,
    highlighter: 20,
    eraser: 10,
    circle: 0,
    square: 0,
    triangle: 0
  }
}

export const CIRCLE_OPTIONS_DEFAULT: CircleOptions = {
  shapeType: 'fill',
  fillColorHex: COMMON_DEFAULT.selectedColor,
  strokeThickness: 0,
  strokeColorHex: COMMON_DEFAULT.selectedColor
}

export const SQUARE_OPTIONS_DEFAULT: SquareOptions = {
  shapeType: 'fill',
  fillColorHex: COMMON_DEFAULT.selectedColor,
  strokeThickness: 0,
  strokeColorHex: COMMON_DEFAULT.selectedColor
}

export const TRIANGLE_OPTIONS_DEFAULT: SquareOptions = {
  shapeType: 'fill',
  fillColorHex: COMMON_DEFAULT.selectedColor,
  strokeThickness: 0,
  strokeColorHex: COMMON_DEFAULT.selectedColor
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
  strokeColorHex: COMMON_DEFAULT.selectedColor,
  opacity: 100
}
export const HIGHLIGHTER_OPTIONS_DEFAULT: HighlighterOptions = {
  lineCap: 'butt',
  lineJoin: 'round',
  strokeThickness: 20,
  strokeColorHex: COMMON_DEFAULT.selectedColor,
  opacity: 55
}
export const TEXT_OPTIONS_DEFAULT: TextOptions = {
  text: 'text here',
  fontFamily: 'sans-serif',
  fontSize: 30,
  fontColorHex: COMMON_DEFAULT.selectedColor
}
export const ICON_OPTIONS_DEFAULT: IconOptions = {
  svgPath: '',
  bgColorHex: COMMON_DEFAULT.selectedColor
}
export const IMAGE_OPTIONS_DEFAULT: ImageOptions = {
  imageUrl: ''
}

export const CANVAS_OBJECT_DEFAULT: Omit<CanvasObject, 'id' | 'type'> = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  backgroundColorHex: COMMON_DEFAULT.selectedColor,
  strokeColorHex: COMMON_DEFAULT.selectedColor,
  strokeWidth: 1,
  opacity: 100,
  borderRadius: 0,
  freeDrawPoints: [],
  text: '',
  textJustify: false,
  textAlignHorizontal: 'center',
  textAlignVertical: 'middle',
  fontColorHex: COMMON_DEFAULT.selectedColor,
  fontSize: 48,
  fontFamily: 'sans-serif',
  fontStyle: 'normal',
  fontVariant: 'normal',
  fontWeight: 'normal',
  fontLineHeightRatio: 1,
  svgPath: '',
  imageUrl: '',
  imageElement: null
}

import { CanvasObject, ShapeType, UserMode } from './types'

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

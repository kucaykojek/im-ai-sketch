import { FabricObject } from 'fabric'

import {
  EllipseOptions,
  EraserOptions,
  HighlighterOptions,
  PencilOptions,
  RectOptions,
  TextOptions,
  TriangleOptions
} from './types'

export const CANVAS_ID: string = 'im-aisketch-canvas'
export const OBJECTS_STORAGE_KEY = 'im-aisketch-canvas-objects'
export const BG_STORAGE_KEY = 'im-aisketch-canvas-bg'
export const PRIMARY_COLOR_HEX = '#ffc40c'

export const PALETTE_COLORS: string[] = [
  '#000000',
  '#f24822',
  '#ffcd29',
  '#14ae5c',
  '#0d99ff',
  '#9747ff'
]

export const CANVAS_DEFAULT = {
  background: '#ffffff',
  dimension: {
    width: 500,
    height: 500
  }
}

export const OBJECT_DEFAULT = {
  color: '#000000'
}

export const SELECTION_OPTIONS: Pick<
  FabricObject,
  'transparentCorners' | 'borderColor' | 'cornerColor' | 'cornerStyle'
> = {
  transparentCorners: false,
  borderColor: PRIMARY_COLOR_HEX,
  cornerColor: PRIMARY_COLOR_HEX,
  cornerStyle: 'circle'
}

export const PENCIL_OPTIONS_DEFAULT: Pick<
  PencilOptions,
  'width' | 'color' | 'strokeLineCap' | 'strokeLineJoin'
> = {
  color: OBJECT_DEFAULT.color,
  width: 2,
  strokeLineCap: 'round',
  strokeLineJoin: 'round'
}

export const ERASER_OPTIONS_DEFAULT: Pick<
  EraserOptions,
  'width' | 'strokeLineCap' | 'strokeLineJoin'
> = {
  width: 10,
  strokeLineCap: 'round',
  strokeLineJoin: 'miter'
}

export const HIGHLIGHTER_OPTIONS_DEFAULT: Pick<
  HighlighterOptions,
  'width' | 'color' | 'strokeLineCap' | 'strokeLineJoin'
> = {
  color: OBJECT_DEFAULT.color + 55,
  width: 20,
  strokeLineCap: 'butt',
  strokeLineJoin: 'round'
}

export const ELLIPSE_OPTIONS_DEFAULT: EllipseOptions = {
  fill: OBJECT_DEFAULT.color,
  strokeWidth: 0,
  stroke: OBJECT_DEFAULT.color,
  opacity: 1
}

export const RECT_OPTIONS_DEFAULT: RectOptions = {
  fill: OBJECT_DEFAULT.color,
  strokeWidth: 0,
  stroke: OBJECT_DEFAULT.color,
  opacity: 1
}

export const TRIANGLE_OPTIONS_DEFAULT: TriangleOptions = {
  fill: OBJECT_DEFAULT.color,
  strokeWidth: 0,
  stroke: OBJECT_DEFAULT.color,
  opacity: 1
}

export const TEXT_OPTIONS_DEFAULT: TextOptions = {
  text: 'text',
  fontFamily: 'Arial',
  fontWeight: 'normal',
  fontStyle: 'normal',
  underline: false,
  linethrough: false,
  fill: OBJECT_DEFAULT.color
}

import {
  CircleOptions,
  HighlighterOptions,
  PencilOptions,
  RectangleOptions,
  TriangleOptions
} from './types'

export const CANVAS_ID: string = 'im-aisketch-canvas'
export const OBJECTS_STORAGE_KEY = 'im-aisketch-objects'
export const BG_STORAGE_KEY = 'im-aisketch-bg'
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

export const PENCIL_OPTIONS_DEFAULT: Pick<
  PencilOptions,
  'width' | 'color' | 'strokeLineCap' | 'strokeLineJoin'
> = {
  color: OBJECT_DEFAULT.color,
  width: 2,
  strokeLineCap: 'round',
  strokeLineJoin: 'round'
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

export const CIRCLE_OPTIONS_DEFAULT: CircleOptions = {
  fill: OBJECT_DEFAULT.color,
  strokeWidth: 0,
  stroke: OBJECT_DEFAULT.color,
  opacity: 100
}

export const RECTANGLE_OPTIONS_DEFAULT: RectangleOptions = {
  fill: OBJECT_DEFAULT.color,
  strokeWidth: 0,
  stroke: OBJECT_DEFAULT.color,
  opacity: 100
}

export const TRIANGLE_OPTIONS_DEFAULT: TriangleOptions = {
  fill: OBJECT_DEFAULT.color,
  strokeWidth: 0,
  stroke: OBJECT_DEFAULT.color,
  opacity: 100
}

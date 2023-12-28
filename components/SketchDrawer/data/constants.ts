import { FreehandTools } from './enums'

export const COLORS: string[] = [
  '#000000',
  '#f24822',
  '#ffcd29',
  '#14ae5c',
  '#0d99ff',
  '#9747ff'
]

export const PATH_KEY = 'im-sd-paths'

export const SELECTED_KEYS = {
  bg: 'im-sd-bg',
  color: 'im-sd-color',
  tool: 'im-sd-tool'
}

export const SELECTED_DEFAULT_VALUES = {
  bg: '#ffffff',
  color: '#000000',
  tool: FreehandTools.Pencil
}

export const DEFAULT_BRUSH_SIZES = {
  [FreehandTools.Pencil]: 3,
  [FreehandTools.Highlighter]: 20,
  [FreehandTools.Eraser]: 10
}

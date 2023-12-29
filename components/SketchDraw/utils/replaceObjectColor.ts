import { CanvasObjectType } from '../data/types'
import isHexLight from './isHexLight'

export default function replaceObjectColor(
  type: CanvasObjectType,
  color: string
) {
  switch (type) {
    case 'pencil':
    case 'highlighter':
    case 'eraser':
      return {
        strokeColorHex: color
      }

    case 'circle':
    case 'square':
    case 'triangle':
      return {
        backgroundColorHex: color,
        strokeColorHex: isHexLight(color) ? '#000000' : '#ffffff'
      }

    case 'text':
      return {
        fontColorHex: color
      }

    default:
      return {}
  }
}

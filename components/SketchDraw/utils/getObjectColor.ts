import { CanvasObject } from '../data/types'

export default function getObjectColor(object: CanvasObject) {
  switch (object.type) {
    case 'pencil':
    case 'highlighter':
      return object.strokeColorHex

    case 'circle':
    case 'square':
    case 'triangle':
      return object.backgroundColorHex

    case 'text':
      return object.fontColorHex

    default:
      return null
  }
}

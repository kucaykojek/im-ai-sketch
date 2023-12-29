import { CanvasObjectType } from '../data/types'

export default function isObjectCanUpdateColor(type: CanvasObjectType) {
  return [
    'pencil',
    'highlighter',
    'circle',
    'square',
    'triangle',
    'text'
  ].includes(type)
}

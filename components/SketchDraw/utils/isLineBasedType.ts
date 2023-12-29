import { CanvasObjectType } from '../data/types'

export default function isLineBasedType(
  type: Omit<CanvasObjectType, 'select'>
) {
  return ['pencil', 'highlighter', 'eraser'].includes(type as string)
}

import { CanvasObjectType } from '@/sketch-draw/data/types'

export default function isObjectPointBasedType(
  type: Omit<CanvasObjectType, 'select'>
) {
  return ['pencil', 'highlighter', 'eraser'].includes(type as string)
}

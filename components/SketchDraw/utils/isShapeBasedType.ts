import { CanvasObjectType } from '../data/types'

export default function isShapeBasedType(
  type: Omit<CanvasObjectType, 'select'>
) {
  return ['circle', 'square', 'triangle'].includes(type as string)
}

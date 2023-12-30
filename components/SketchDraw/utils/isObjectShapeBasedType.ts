import { CanvasObjectType } from '@/sketch-draw/data/types'

export default function isObjectShapeBasedType(
  type: Omit<CanvasObjectType, 'select'>
) {
  return ['circle', 'square', 'triangle'].includes(type as string)
}

import { CanvasObject } from '@/sketch-draw/data/types'

export default function getCanvasObjectById(
  objectId: string | null,
  objects: CanvasObject[]
) {
  return objectId ? objects.find((obj) => obj.id === objectId) : undefined
}

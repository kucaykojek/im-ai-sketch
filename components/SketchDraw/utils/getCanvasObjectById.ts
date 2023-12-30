import { CanvasObject } from '@/sketch-draw/data/types'

export default function getCanvasObjectById(
  objectId: string,
  objects: CanvasObject[]
) {
  return objects.find((obj) => obj.id === objectId)
}

import { OBJECTS_STORAGE_KEY } from '../data/constants'
import { CanvasObject } from '../data/types'
import isLineBasedType from './isLineBasedType'
import isShapeBasedType from './isShapeBasedType'

export default function saveObjectsToStorage(obj: CanvasObject[]) {
  if (localStorage) {
    // Cleanup empty objects
    const filteredObjets = obj.filter(
      (val) =>
        (isLineBasedType(val.type) && val.freeDrawPoints.length > 1) ||
        (isShapeBasedType(val.type) && val.width > 0 && val.height > 8)
    )

    localStorage.setItem(OBJECTS_STORAGE_KEY, JSON.stringify(filteredObjets))
  }
}

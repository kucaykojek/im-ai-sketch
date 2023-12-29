import { OBJECTS_STORAGE_KEY } from '../data/constants'
import { CanvasObject } from '../data/types'

export default function saveObjectsToStorage(obj: CanvasObject[]) {
  if (localStorage) {
    // Cleanup empty objects
    const filteredObjets = obj.filter((val) => {
      const isLineBased = ['pencil', 'highlighter', 'eraser'].includes(val.type)
      const isShapeBased = ['circle', 'square', 'triangle'].includes(val.type)

      return (
        (isLineBased && val.freeDrawPoints.length > 1) ||
        (isShapeBased && val.width > 0 && val.height > 8)
      )
    })

    localStorage.setItem(OBJECTS_STORAGE_KEY, JSON.stringify(filteredObjets))
  }
}

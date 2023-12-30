import { omit } from 'lodash'

import { OBJECTS_STORAGE_KEY } from '@/sketch-draw/data/constants'
import { CanvasObject } from '@/sketch-draw/data/types'

import isObjectPointBasedType from './isObjectPointBasedType'
import isObjectShapeBasedType from './isObjectShapeBasedType'

export default function saveObjectsToStorage(obj: CanvasObject[]) {
  if (localStorage) {
    // Cleanup empty objects
    const filteredObjects = obj
      .filter(
        (val) =>
          (isObjectPointBasedType(val.type) && val.points!.length > 1) ||
          (isObjectShapeBasedType(val.type) &&
            val.width > 0 &&
            val.height > 0) ||
          val.type === 'text' ||
          val.type === 'image'
      )
      .map((val) => {
        return val.type === 'image'
          ? omit(val, ['imageOpts.imageElement'])
          : val
      })

    localStorage.setItem(OBJECTS_STORAGE_KEY, JSON.stringify(filteredObjects))
  }
}

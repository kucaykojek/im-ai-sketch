import { omit } from 'lodash'

import { OBJECTS_STORAGE_KEY } from '../data/constants'
import { CanvasObject } from '../data/types'

export default function saveObjectsToStorage(obj: CanvasObject[]) {
  if (localStorage) {
    // Cleanup empty objects
    const filteredObjects = obj.map((val) => {
      return val.type === 'image' ? omit(val, ['imageOpts.imageElement']) : val
    })

    localStorage.setItem(OBJECTS_STORAGE_KEY, JSON.stringify(filteredObjects))
  }
}

import { create } from 'zustand'

import { COMMON_DEFAULT } from '../data/constants'
import { ShapeType } from '../data/types'

const useShapeType = create<{
  shapeType: 'fill' | 'outline'
  setShapeType: (_: ShapeType) => void
}>((set) => ({
  shapeType: COMMON_DEFAULT.shapeType,
  setShapeType: (shapeType: ShapeType) => set(() => ({ shapeType }))
}))

export default useShapeType

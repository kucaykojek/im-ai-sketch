import { create } from 'zustand'

import { COMMON_DEFAULT } from '@/sketch-draw/data/constants'

type ObjectColor = string

const useCanvasObjectColor = create<{
  objectColor: ObjectColor
  setObjectColor: (_: ObjectColor) => void
}>((set) => ({
  objectColor: COMMON_DEFAULT.canvasObjectColor,
  setObjectColor: (objectColor: ObjectColor) => set(() => ({ objectColor }))
}))

export default useCanvasObjectColor

import { create } from 'zustand'

import { COMMON_DEFAULT } from '@/sketch-draw/data/constants'

const useCanvasBackgroundColor = create<{
  canvasBackgroundColor: string
  setCanvasBackgroundColor: (_: string) => void
}>((set) => ({
  canvasBackgroundColor: COMMON_DEFAULT.canvasBackgroundColor,
  setCanvasBackgroundColor: (canvasBackgroundColor: string) =>
    set(() => ({ canvasBackgroundColor }))
}))

export default useCanvasBackgroundColor

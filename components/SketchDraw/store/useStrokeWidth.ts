import { create } from 'zustand'

import { COMMON_DEFAULT } from '../data/constants'

type StrokeWidth = { [_: string]: number }

const useStrokeWidth = create<{
  strokeWidth: StrokeWidth
  setStrokeWidth: (_: StrokeWidth) => void
}>((set) => ({
  strokeWidth: COMMON_DEFAULT.strokeWidth,
  setStrokeWidth: (strokeWidth: StrokeWidth) =>
    set((state) => ({
      ...state,
      strokeWidth: { ...state.strokeWidth, ...strokeWidth }
    }))
}))

export default useStrokeWidth

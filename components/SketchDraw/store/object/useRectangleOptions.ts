import { create } from 'zustand'

import { RECTANGLE_OPTIONS_DEFAULT } from '@/sketch-draw/data/constants'
import { RectangleOptions } from '@/sketch-draw/data/types'

const useRectangleOptions = create<{
  options: RectangleOptions
  setOptions: (_: RectangleOptions) => void
}>((set) => ({
  options: {
    ...RECTANGLE_OPTIONS_DEFAULT
  },
  setOptions: (options: RectangleOptions) =>
    set((state) => ({
      ...state,
      options: { ...state.options, ...options }
    }))
}))

export default useRectangleOptions

import { create } from 'zustand'

import { TRIANGLE_OPTIONS_DEFAULT } from '@/sketch-draw/data/constants'
import { TriangleOptions } from '@/sketch-draw/data/types'

const useTriangleOptions = create<{
  options: TriangleOptions
  setOptions: (_: TriangleOptions) => void
}>((set) => ({
  options: {
    ...TRIANGLE_OPTIONS_DEFAULT
  },
  setOptions: (options: TriangleOptions) =>
    set((state) => ({
      ...state,
      options: { ...state.options, ...options }
    }))
}))

export default useTriangleOptions

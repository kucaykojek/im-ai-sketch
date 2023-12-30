import { create } from 'zustand'

import { ERASER_OPTIONS_DEFAULT } from '@/sketch-draw/data/constants'
import { EraserOptions } from '@/sketch-draw/data/types'

const useEraserOptions = create<{
  options: EraserOptions
  setOptions: (_: EraserOptions) => void
}>((set) => ({
  options: {
    ...ERASER_OPTIONS_DEFAULT
  },
  setOptions: (options: EraserOptions) =>
    set((state) => ({
      ...state,
      options: { ...state.options, ...options }
    }))
}))

export default useEraserOptions

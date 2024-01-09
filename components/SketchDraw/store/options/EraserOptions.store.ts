import { create } from 'zustand'

import { ERASER_OPTIONS_DEFAULT } from '../../data/constants'
import { EraserOptions } from '../../data/types'

const useEraserOptions = create<{
  options: EraserOptions
  setOptions: (_: EraserOptions) => void
  resetOptions: () => void
}>((set) => ({
  options: {
    ...ERASER_OPTIONS_DEFAULT
  },
  setOptions: (options: EraserOptions) =>
    set((state) => ({
      options: { ...state.options, ...options }
    })),
  resetOptions: () =>
    set(() => ({
      options: { ...ERASER_OPTIONS_DEFAULT }
    }))
}))

export default useEraserOptions

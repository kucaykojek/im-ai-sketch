import { create } from 'zustand'

import { RECTANGLE_OPTIONS_DEFAULT } from '../../data/constants'
import { RectangleOptions } from '../../data/types'

const useRectangleOptions = create<{
  options: RectangleOptions
  setOptions: (_: RectangleOptions) => void
  resetOptions: () => void
}>((set) => ({
  options: {
    ...RECTANGLE_OPTIONS_DEFAULT
  },
  setOptions: (options: RectangleOptions) =>
    set((state) => ({
      options: { ...state.options, ...options }
    })),
  resetOptions: () =>
    set(() => ({
      options: { ...RECTANGLE_OPTIONS_DEFAULT }
    }))
}))

export default useRectangleOptions

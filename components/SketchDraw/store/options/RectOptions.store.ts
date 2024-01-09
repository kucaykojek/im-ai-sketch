import { create } from 'zustand'

import { RECT_OPTIONS_DEFAULT } from '../../data/constants'
import { RectOptions } from '../../data/types'

const useRectOptions = create<{
  options: RectOptions
  setOptions: (_: RectOptions) => void
  resetOptions: () => void
}>((set) => ({
  options: {
    ...RECT_OPTIONS_DEFAULT
  },
  setOptions: (options: RectOptions) =>
    set((state) => ({
      options: { ...state.options, ...options }
    })),
  resetOptions: () =>
    set(() => ({
      options: { ...RECT_OPTIONS_DEFAULT }
    }))
}))

export default useRectOptions

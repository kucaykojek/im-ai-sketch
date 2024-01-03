import { create } from 'zustand'

import { TRIANGLE_OPTIONS_DEFAULT } from '../../data/constants'
import { TriangleOptions } from '../../data/types'

const useTriangleOptions = create<{
  options: TriangleOptions
  setOptions: (_: TriangleOptions) => void
  resetOptions: () => void
}>((set) => ({
  options: {
    ...TRIANGLE_OPTIONS_DEFAULT
  },
  setOptions: (options: TriangleOptions) =>
    set((state) => ({
      options: { ...state.options, ...options }
    })),
  resetOptions: () =>
    set(() => ({
      options: { ...TRIANGLE_OPTIONS_DEFAULT }
    }))
}))

export default useTriangleOptions

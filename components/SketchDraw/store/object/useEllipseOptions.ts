import { create } from 'zustand'

import { ELLIPSE_OPTIONS_DEFAULT } from '../../data/constants'
import { EllipseOptions } from '../../data/types'

const useEllipseOptions = create<{
  options: EllipseOptions
  setOptions: (_: EllipseOptions) => void
  resetOptions: () => void
}>((set) => ({
  options: {
    ...ELLIPSE_OPTIONS_DEFAULT
  },
  setOptions: (options: EllipseOptions) =>
    set((state) => ({
      options: { ...state.options, ...options }
    })),
  resetOptions: () =>
    set(() => ({
      options: { ...ELLIPSE_OPTIONS_DEFAULT }
    }))
}))

export default useEllipseOptions

import { create } from 'zustand'

import { ICON_OPTIONS_DEFAULT } from '@/sketch-draw/data/constants'
import { IconOptions } from '@/sketch-draw/data/types'

const useIconOptions = create<{
  options: IconOptions
  setOptions: (_: IconOptions) => void
}>((set) => ({
  options: {
    ...ICON_OPTIONS_DEFAULT
  },
  setOptions: (options: IconOptions) =>
    set((state) => ({
      ...state,
      options: { ...state.options, ...options }
    }))
}))

export default useIconOptions

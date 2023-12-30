import { create } from 'zustand'

import { IMAGE_OPTIONS_DEFAULT } from '@/sketch-draw/data/constants'
import { ImageOptions } from '@/sketch-draw/data/types'

const useImageOptions = create<{
  options: ImageOptions
  setOptions: (_: ImageOptions) => void
}>((set) => ({
  options: {
    ...IMAGE_OPTIONS_DEFAULT
  },
  setOptions: (options: ImageOptions) =>
    set((state) => ({
      ...state,
      options: { ...state.options, ...options }
    }))
}))

export default useImageOptions

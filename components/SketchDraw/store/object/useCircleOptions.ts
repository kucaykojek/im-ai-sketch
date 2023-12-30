import { create } from 'zustand'

import { CIRCLE_OPTIONS_DEFAULT } from '@/sketch-draw/data/constants'
import { CircleOptions } from '@/sketch-draw/data/types'

const useCircleOptions = create<{
  options: CircleOptions
  setOptions: (_: CircleOptions) => void
}>((set) => ({
  options: {
    ...CIRCLE_OPTIONS_DEFAULT
  },
  setOptions: (options: CircleOptions) =>
    set((state) => ({
      ...state,
      options: { ...state.options, ...options }
    }))
}))

export default useCircleOptions

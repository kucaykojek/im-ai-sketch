import { create } from 'zustand'

import { SQUARE_OPTIONS_DEFAULT } from '@/sketch-draw/data/constants'
import { SquareOptions } from '@/sketch-draw/data/types'

const useSquareOptions = create<{
  options: SquareOptions
  setOptions: (_: SquareOptions) => void
}>((set) => ({
  options: {
    ...SQUARE_OPTIONS_DEFAULT
  },
  setOptions: (options: SquareOptions) =>
    set((state) => ({
      ...state,
      options: { ...state.options, ...options }
    }))
}))

export default useSquareOptions

import { create } from 'zustand'

import { CIRCLE_OPTIONS_DEFAULT } from '../../data/constants'
import { CircleOptions } from '../../data/types'

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

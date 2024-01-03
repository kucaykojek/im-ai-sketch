import { create } from 'zustand'

import { CIRCLE_OPTIONS_DEFAULT } from '../../data/constants'
import { CircleOptions } from '../../data/types'

const useCircleOptions = create<{
  options: CircleOptions
  setOptions: (_: CircleOptions) => void
  resetOptions: () => void
}>((set) => ({
  options: {
    ...CIRCLE_OPTIONS_DEFAULT
  },
  setOptions: (options: CircleOptions) =>
    set((state) => ({
      options: { ...state.options, ...options }
    })),
  resetOptions: () =>
    set(() => ({
      options: { ...CIRCLE_OPTIONS_DEFAULT }
    }))
}))

export default useCircleOptions

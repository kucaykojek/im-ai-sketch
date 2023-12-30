import { create } from 'zustand'

import { TEXT_OPTIONS_DEFAULT } from '../../data/constants'
import { TextOptions } from '../../data/types'

const useTextOptions = create<{
  options: TextOptions
  setOptions: (_: TextOptions) => void
}>((set) => ({
  options: {
    ...TEXT_OPTIONS_DEFAULT
  },
  setOptions: (options: TextOptions) =>
    set((state) => ({
      ...state,
      options: { ...state.options, ...options }
    }))
}))

export default useTextOptions

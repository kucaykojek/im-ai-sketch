import { create } from 'zustand'

import { TEXT_OPTIONS_DEFAULT } from '../../data/constants'
import { TextOptions } from '../../data/types'

const useTextOptions = create<{
  options: TextOptions
  setOptions: (_: TextOptions) => void
  resetOptions: () => void
}>((set) => ({
  options: {
    ...TEXT_OPTIONS_DEFAULT
  },
  setOptions: (options: TextOptions) =>
    set((state) => ({
      options: { ...state.options, ...options }
    })),
  resetOptions: () =>
    set(() => ({
      options: { ...TEXT_OPTIONS_DEFAULT }
    }))
}))

export default useTextOptions

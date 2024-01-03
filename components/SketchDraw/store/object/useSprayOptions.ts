import { create } from 'zustand'

import { SPRAY_OPTIONS_DEFAULT } from '../../data/constants'
import { SprayOptions } from '../../data/types'

const useSprayOptions = create<{
  options: SprayOptions
  setOptions: (_: SprayOptions) => void
  resetOptions: () => void
}>((set) => ({
  options: {
    ...SPRAY_OPTIONS_DEFAULT
  },
  setOptions: (options: SprayOptions) =>
    set((state) => ({
      options: { ...state.options, ...options }
    })),
  resetOptions: () =>
    set(() => ({
      options: { ...SPRAY_OPTIONS_DEFAULT }
    }))
}))

export default useSprayOptions

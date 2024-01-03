import { create } from 'zustand'

import { PENCIL_OPTIONS_DEFAULT } from '../../data/constants'
import { PencilOptions } from '../../data/types'

const usePencilOptions = create<{
  options: PencilOptions
  setOptions: (_: PencilOptions) => void
  resetOptions: () => void
}>((set) => ({
  options: {
    ...PENCIL_OPTIONS_DEFAULT
  },
  setOptions: (options: PencilOptions) =>
    set((state) => ({
      options: { ...state.options, ...options }
    })),
  resetOptions: () =>
    set(() => ({
      options: { ...PENCIL_OPTIONS_DEFAULT }
    }))
}))

export default usePencilOptions

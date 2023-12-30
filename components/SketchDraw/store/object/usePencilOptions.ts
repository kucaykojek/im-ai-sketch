import { create } from 'zustand'

import { PENCIL_OPTIONS_DEFAULT } from '../../data/constants'
import { PencilOptions } from '../../data/types'

const usePencilOptions = create<{
  options: PencilOptions
  setOptions: (_: PencilOptions) => void
}>((set) => ({
  options: {
    ...PENCIL_OPTIONS_DEFAULT
  },
  setOptions: (options: PencilOptions) =>
    set((state) => ({
      ...state,
      options: { ...state.options, ...options }
    }))
}))

export default usePencilOptions

import { create } from 'zustand'

import { HIGHLIGHTER_OPTIONS_DEFAULT } from '../../data/constants'
import { HighlighterOptions } from '../../data/types'

const useHighlighterOptions = create<{
  options: HighlighterOptions
  setOptions: (_: HighlighterOptions) => void
}>((set) => ({
  options: {
    ...HIGHLIGHTER_OPTIONS_DEFAULT
  },
  setOptions: (options: HighlighterOptions) =>
    set((state) => ({
      ...state,
      options: { ...state.options, ...options }
    }))
}))

export default useHighlighterOptions
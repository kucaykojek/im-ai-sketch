import { create } from 'zustand'

import { COMMON_DEFAULT } from '../data/constants'

interface DefaultParams {
  canvasBackgroundColor: string
  backgroundColorHex: string
  strokeColorHex: string
  fontColorHex: string
}

const useDefaultParams = create<{
  defaultParams: DefaultParams
  setDefaultParams: (_: Partial<DefaultParams>) => void
}>((set) => ({
  defaultParams: {
    canvasBackgroundColor: COMMON_DEFAULT.canvasBackgroundColor,
    backgroundColorHex: COMMON_DEFAULT.selectedColor,
    strokeColorHex: COMMON_DEFAULT.selectedColor,
    fontColorHex: COMMON_DEFAULT.selectedColor
  },
  setDefaultParams: (params: Partial<DefaultParams>) =>
    set((state) => ({
      defaultParams: { ...state.defaultParams, ...params }
    }))
}))

export default useDefaultParams

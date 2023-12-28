import { create } from 'zustand'

import SketchDrawerHandler from './SketchDrawer.handler'
import { SELECTED_VALUES } from './data/constants'

type SketchDrawerStore = {
  instance?: SketchDrawerHandler
  setInstance: (_: SketchDrawerHandler) => void
  selectedColor: string
  setSelectedColor: (_: string) => void
  selectedTool: string
  setSelectedTool: (_: string) => void
}

const useSketchDrawerStore = create<SketchDrawerStore>((set) => ({
  instance: undefined,
  selectedColor: SELECTED_VALUES.color,
  selectedTool: SELECTED_VALUES.tool,
  setInstance(val: SketchDrawerHandler) {
    set((state) => ({
      ...state,
      instance: val
    }))
  },
  setSelectedColor(val: string) {
    set((state) => ({
      ...state,
      selectedColor: val
    }))
  },
  setSelectedTool(val: string) {
    set((state) => ({
      ...state,
      selectedTool: val
    }))
  }
}))

export default useSketchDrawerStore

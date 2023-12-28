import { create } from 'zustand'

import SketchDrawerHandler from './SketchDrawer.handler'
import { DEFAULT_BRUSH_SIZES, SELECTED_DEFAULT_VALUES } from './data/constants'
import { FreehandTools, ShapeTools } from './data/enums'
import type {
  FreehandTools as FreehandToolsType,
  ShapeTools as ShapeToolsType,
  SketchDrawerStore
} from './data/types'

const useSketchDrawerStore = create<SketchDrawerStore>((set) => ({
  paths: [],
  canvasBg: SELECTED_DEFAULT_VALUES.bg,
  freehandTools: {
    brushColor: SELECTED_DEFAULT_VALUES.color,
    brushSize: DEFAULT_BRUSH_SIZES[FreehandTools.Pencil],
    lineCap: 'round',
    lineJoin: 'round'
  },
  shapesTools: {},
  selectedColor: SELECTED_DEFAULT_VALUES.color,
  selectedTool: SELECTED_DEFAULT_VALUES.tool,
  brushSize: DEFAULT_BRUSH_SIZES[FreehandTools.Pencil],
  setPaths(val: any[]) {
    set((state) => ({
      ...state,
      paths: val
    }))
  },
  setCanvasBg(val: string) {
    set((state) => ({
      ...state,
      canvasBg: val
    }))
  },
  setFreehandTools(val: FreehandToolsType) {
    set((state) => ({
      ...state,
      freehandTools: val
    }))
  },
  setShapeTools(val: ShapeToolsType) {
    set((state) => ({
      ...state,
      shapesTools: val
    }))
  },
  setSelectedColor(val: string) {
    set((state) => ({
      ...state,
      selectedColor: val
    }))
  },
  setSelectedTool(val: FreehandTools | ShapeTools) {
    set((state) => ({
      ...state,
      selectedTool: val
    }))
  },
  setBrushSize(val: number) {
    set((state) => ({
      ...state,
      brushSize: val
    }))
  }
}))

export default useSketchDrawerStore

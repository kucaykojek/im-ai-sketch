import { create } from 'zustand'

import { CANVAS_DEFAULT } from '@/components/SketchDraw/data/constants'
import { Canvas } from '@/components/SketchDraw/data/types'

const useCanvas = create<{
  canvas: Canvas['canvas']
  canvasOptions: Canvas['canvasOptions']
  selectedObjects: Canvas['selectedObjects']
  activeTool: Canvas['activeTool']
  setCanvas: (_: Canvas['canvas']) => void
  setCanvasOptions: (_: Canvas['canvasOptions']) => void
  setSelectedObjects: (_: Canvas['selectedObjects']) => void
  setActiveTool: (_: Canvas['activeTool']) => void
}>((set, get) => ({
  canvas: null,
  canvasOptions: {
    backgroundColor: CANVAS_DEFAULT.background,
    width: CANVAS_DEFAULT.dimension.width,
    height: CANVAS_DEFAULT.dimension.height
  },
  selectedObjects: [],
  activeTool: null,
  setCanvas: (canvas) => set(() => ({ canvas })),
  setCanvasOptions: (canvasOptions) =>
    set(() => ({
      canvasOptions: { ...get().canvasOptions, ...canvasOptions }
    })),
  setSelectedObjects: (selectedObjects) => set(() => ({ selectedObjects })),
  setActiveTool: (activeTool) => set(() => ({ activeTool }))
}))

export default useCanvas

import { create } from 'zustand'

import { CANVAS_DEFAULT } from '@/components/SketchDraw/data/constants'
import { CanvasType } from '@/components/SketchDraw/data/types'

const useCanvas = create<{
  canvas: CanvasType['canvas']
  canvasOptions: CanvasType['canvasOptions']
  selectedObjects: CanvasType['selectedObjects']
  activeTool: CanvasType['activeTool']
  setCanvas: (_: CanvasType['canvas']) => void
  setCanvasOptions: (_: CanvasType['canvasOptions']) => void
  setSelectedObjects: (_: CanvasType['selectedObjects']) => void
  setActiveTool: (_: CanvasType['activeTool']) => void
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

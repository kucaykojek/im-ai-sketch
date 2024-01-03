import { create } from 'zustand'

import { CANVAS_DEFAULT } from '@/components/SketchDraw/data/constants'
import { Canvas } from '@/components/SketchDraw/data/types'

const useCanvas = create<{
  canvas: Canvas['canvas']
  canvasOptions: Canvas['canvasOptions']
  activeObject: Canvas['activeObject']
  activeTool: Canvas['activeTool']
  setCanvas: (_: Canvas['canvas']) => void
  setCanvasOptions: (_: Canvas['canvasOptions']) => void
  setActiveObject: (_: Canvas['activeObject']) => void
  setActiveTool: (_: Canvas['activeTool']) => void
}>((set, get) => ({
  canvas: null,
  canvasOptions: {
    backgroundColor: CANVAS_DEFAULT.background,
    width: CANVAS_DEFAULT.dimension.width,
    height: CANVAS_DEFAULT.dimension.height
  },
  activeObject: null,
  activeTool: null,
  setCanvas: (canvas) => set(() => ({ canvas })),
  setCanvasOptions: (canvasOptions) =>
    set(() => ({
      canvasOptions: { ...get().canvasOptions, ...canvasOptions }
    })),
  setActiveObject: (activeObject) => set(() => ({ activeObject })),
  setActiveTool: (activeTool) => set(() => ({ activeTool }))
}))

export default useCanvas

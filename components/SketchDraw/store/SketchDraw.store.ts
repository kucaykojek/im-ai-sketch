import { createRef } from 'react'
import { create } from 'zustand'

import { CANVAS_DEFAULT } from '../data/constants'
import type { SketchDraw } from '../data/types'

const useSketchDrawStore = create<{
  isReady: boolean
  canvasRef: SketchDraw['canvasRef']
  containerRef: SketchDraw['containerRef']
  containerSize: SketchDraw['containerSize']
  canvas: SketchDraw['canvas']
  history: SketchDraw['history']
  historyStates: string[]
  canvasOptions: SketchDraw['canvasOptions']
  selectedObjects: SketchDraw['selectedObjects']
  activeTool: SketchDraw['activeTool']
  setIsReady: (_: boolean) => void
  setCanvasRef: (_: SketchDraw['canvasRef']) => void
  setContainerRef: (_: SketchDraw['containerRef']) => void
  setContainerSize: (_: SketchDraw['containerSize']) => void
  setCanvas: (_: SketchDraw['canvas']) => void
  setHistory: (_: SketchDraw['history']) => void
  pushHistoryState: (_: string) => void
  popHistoryState: () => void
  clearHistoryStates: (_: string[]) => void
  setCanvasOptions: (_: SketchDraw['canvasOptions']) => void
  setSelectedObjects: (_: SketchDraw['selectedObjects']) => void
  setActiveTool: (_: SketchDraw['activeTool']) => void
}>((set, get) => ({
  isReady: false,
  canvasRef: createRef(),
  containerRef: createRef(),
  containerSize: { width: 0, height: 0 },
  canvas: null,
  history: null,
  historyStates: [],
  canvasOptions: {
    backgroundColor: CANVAS_DEFAULT.background,
    width: CANVAS_DEFAULT.dimension.width,
    height: CANVAS_DEFAULT.dimension.height
  },
  selectedObjects: [],
  activeTool: null,
  setIsReady: (isReady) => set(() => ({ isReady })),
  setCanvasRef: (canvasRef) => set(() => ({ canvasRef })),
  setContainerRef: (containerRef) => set(() => ({ containerRef })),
  setContainerSize: (containerSize) => set(() => ({ containerSize })),
  setCanvas: (canvas) => set(() => ({ canvas })),
  setHistory: (history) => set(() => ({ history })),
  pushHistoryState: (historyState) =>
    set(() => {
      const states = get().historyStates
      states.push(historyState)
      return { historyStates: states }
    }),
  popHistoryState: () =>
    set(() => {
      const states = get().historyStates
      states.pop()
      return { historyStates: states }
    }),
  clearHistoryStates: (historyStates) => set(() => ({ historyStates })),
  setCanvasOptions: (canvasOptions) =>
    set(() => ({
      canvasOptions: { ...get().canvasOptions, ...canvasOptions }
    })),
  setSelectedObjects: (selectedObjects) => set(() => ({ selectedObjects })),
  setActiveTool: (activeTool) => set(() => ({ activeTool }))
}))

export default useSketchDrawStore

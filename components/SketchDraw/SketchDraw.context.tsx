import { Canvas } from 'fabric'
import React, {
  type MutableRefObject,
  type ReactNode,
  createContext,
  createRef,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react'

import {
  BG_STORAGE_KEY,
  CANVAS_DEFAULT,
  PRIMARY_COLOR_HEX
} from './data/constants'
import type { CanvasType } from './data/types'
import useCanvas from './store/useCanvas'
import useContainerSize from './store/useContainerSize'
import { drawObjectsFromStorage } from './utils/object'

interface SketchDrawContextType {
  isReady: boolean
  containerRef: MutableRefObject<HTMLDivElement | null>
  canvasRef: MutableRefObject<HTMLCanvasElement | null>
  canvas: CanvasType['canvas']
  initCanvas: () => void
}

const initialState: SketchDrawContextType = {
  isReady: false,
  containerRef: createRef(),
  canvasRef: createRef(),
  canvas: null,
  initCanvas: () => undefined
}

const SketchDrawContext = createContext<SketchDrawContextType>(initialState)

export function SketchDrawProvider({ children }: { children: ReactNode }) {
  const [isReady, setIsReady] = useState(false)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const { canvas, canvasOptions, setCanvas, setCanvasOptions } = useCanvas()
  const { containerSize } = useContainerSize()

  // Init canvas function
  const initCanvas = useCallback(() => {
    if (!containerRef.current) {
      return
    }

    if (!canvasRef.current) {
      return
    }

    const backgroundColor = localStorage
      ? localStorage.getItem(BG_STORAGE_KEY) || CANVAS_DEFAULT.background
      : canvasOptions.backgroundColor
    const width = containerRef.current.offsetWidth
    const height = containerRef.current.offsetHeight

    setCanvasOptions({
      backgroundColor,
      width,
      height
    })

    if (!canvas) {
      const newCanvas = new Canvas(canvasRef.current, {
        backgroundColor,
        width,
        height,
        selectionBorderColor: PRIMARY_COLOR_HEX,
        selectionLineWidth: 1
      })

      setCanvas(newCanvas)

      // TODO: draw
      drawObjectsFromStorage(newCanvas)
    } else {
      canvas.backgroundColor = backgroundColor
      canvas.setDimensions({ width, height })
    }

    setIsReady(true)
  }, [containerSize, canvasOptions.backgroundColor])

  useEffect(() => {
    initCanvas()
  }, [initCanvas])

  const value = useMemo(
    () => ({
      isReady,
      containerRef,
      canvasRef,
      canvas,
      initCanvas
    }),
    [initCanvas]
  )

  return (
    <SketchDrawContext.Provider value={value}>
      {children}
    </SketchDrawContext.Provider>
  )
}

export default function useSketchDrawContext() {
  const context = useContext(SketchDrawContext)
  if (context === undefined) {
    throw new Error(
      'useSketchDrawContext must be used within an SketchDrawProvider'
    )
  }
  return context
}

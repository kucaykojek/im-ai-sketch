import { fabric } from 'fabric'
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

import { BG_STORAGE_KEY, PRIMARY_COLOR_HEX } from './data/constants'
import type { Canvas } from './data/types'
import useCanvas from './store/useCanvas'

interface SketchDrawContextType {
  isReady: boolean
  containerRef: MutableRefObject<HTMLDivElement | null>
  canvasRef: MutableRefObject<HTMLCanvasElement | null>
  canvas: Canvas['canvas']
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

  // Init canvas function
  const initCanvas = useCallback(() => {
    if (!containerRef.current) {
      return
    }

    if (!canvasRef.current) {
      return
    }

    // Restore from local storage
    if (localStorage) {
      // Canvas
      const backgroundColor =
        localStorage.getItem(BG_STORAGE_KEY) || canvasOptions.backgroundColor
      setCanvasOptions({
        backgroundColor
      })

      // TODO: Canvas Objects
    }

    if (!canvas) {
      fabric.Object.prototype.transparentCorners = false
      fabric.Object.prototype.borderColor = PRIMARY_COLOR_HEX
      fabric.Object.prototype.cornerColor = PRIMARY_COLOR_HEX
      fabric.Object.prototype.cornerStyle = 'circle'

      setCanvas(new fabric.Canvas(canvasRef.current, canvasOptions))
    } else {
      canvas.setBackgroundColor(canvasOptions.backgroundColor!, () => {})
      canvas.setWidth(canvasOptions.width!)
      canvas.setHeight(canvasOptions.height!)
    }

    setIsReady(true)
  }, [canvasOptions.width, canvasOptions.height, canvasOptions.backgroundColor])

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

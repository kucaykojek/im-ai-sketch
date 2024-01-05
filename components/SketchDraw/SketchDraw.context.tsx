import { Canvas, FabricObject } from 'fabric'
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
import type { CanvasType } from './data/types'
import useCanvas from './store/useCanvas'

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
        ...canvasOptions,
        backgroundColor
      })

      // TODO: Canvas Objects
    }

    if (!canvas) {
      FabricObject.prototype.transparentCorners = false
      FabricObject.prototype.borderColor = PRIMARY_COLOR_HEX
      FabricObject.prototype.cornerColor = PRIMARY_COLOR_HEX
      FabricObject.prototype.cornerStyle = 'circle'

      setCanvas(new Canvas(canvasRef.current, canvasOptions))
    } else {
      canvas.backgroundColor = canvasOptions.backgroundColor
      canvas.width = canvasOptions.width
      canvas.height = canvasOptions.height
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

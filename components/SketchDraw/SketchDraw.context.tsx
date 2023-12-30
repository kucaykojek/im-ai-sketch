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

import { BG_STORAGE_KEY, OBJECTS_STORAGE_KEY } from './data/constants'
import useActionMode from './store/useActionMode'
import useActiveObjectId from './store/useActiveObjectId'
import useCanvasBackgroundColor from './store/useCanvasBackgroundColor'
import useCanvasObjects from './store/useCanvasObjects'
import useCanvasWorkingSize from './store/useCanvasWorkingSize'
import useContainerSize from './store/useContainerSize'
import useUserMode from './store/useUserMode'
import canvasDrawEverything from './utils/canvasDrawEverything'
import canvasInit from './utils/canvasInit'

interface SketchDrawContextType {
  isReady: boolean
  containerRef: MutableRefObject<HTMLDivElement | null>
  canvasRef: MutableRefObject<HTMLCanvasElement | null>
  contextRef: MutableRefObject<CanvasRenderingContext2D | null>
  initCanvas: () => void
  drawEverything: () => void
}

const initialState: SketchDrawContextType = {
  isReady: false,
  containerRef: createRef(),
  canvasRef: createRef(),
  contextRef: createRef(),
  initCanvas: () => undefined,
  drawEverything: () => undefined
}

const SketchDrawContext = createContext<SketchDrawContextType>(initialState)

export function SketchDrawProvider({ children }: { children: ReactNode }) {
  const [isReady, setIsReady] = useState(false)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const contextRef = useRef<CanvasRenderingContext2D | null>(null)

  const zoom = 100

  const { activeObjectId } = useActiveObjectId()
  const { canvasObjects, reviveCanvasObjects } = useCanvasObjects()
  const { actionMode } = useActionMode()
  const { userMode } = useUserMode()
  const { canvasBackgroundColor, setCanvasBackgroundColor } =
    useCanvasBackgroundColor()
  const { canvasWorkingSize } = useCanvasWorkingSize()
  const { containerSize } = useContainerSize()

  // Init canvas function
  const initCanvas = useCallback(() => {
    const container = containerRef.current
    if (!container) {
      return
    }

    const canvas = canvasRef.current
    if (!canvas) {
      return
    }

    const context = canvas.getContext('2d', { willReadFrequently: true })
    if (!context) {
      return
    }

    // Restore from local storage
    if (localStorage) {
      reviveCanvasObjects(
        localStorage.getItem(OBJECTS_STORAGE_KEY)
          ? JSON.parse(localStorage.getItem(OBJECTS_STORAGE_KEY)!)
          : canvasObjects
      )
      setCanvasBackgroundColor(
        localStorage.getItem(BG_STORAGE_KEY) || canvasBackgroundColor
      )
    }

    contextRef.current = context

    canvasInit({
      canvas,
      context,
      canvasWidth: canvasWorkingSize.width,
      canvasHeight: canvasWorkingSize.height
    })

    setIsReady(true)
  }, [canvasWorkingSize])

  useEffect(() => {
    initCanvas()
  }, [initCanvas])

  // Set initial scroll position
  // Draw everything function
  const drawEverything = useCallback(() => {
    canvasDrawEverything({
      canvas: canvasRef.current,
      context: contextRef.current,
      canvasWorkingSize,
      canvasBackgroundColor,
      canvasObjects,
      activeObjectId,
      actionMode,
      userMode,
      zoom,
      containerSize
    })
  }, [
    canvasWorkingSize,
    canvasBackgroundColor,
    canvasObjects,
    activeObjectId,
    actionMode,
    userMode,
    zoom,
    containerSize
  ])

  useEffect(() => {
    drawEverything()
  }, [drawEverything])

  const value = useMemo(
    () => ({
      containerRef,
      canvasRef,
      contextRef,
      isReady,
      initCanvas,
      drawEverything
    }),
    [initCanvas, drawEverything]
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

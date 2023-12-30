import { Loader2Icon } from 'lucide-react'
import React, {
  type PointerEvent,
  type Touch,
  type TouchEvent,
  useRef
} from 'react'

import useSketchDrawContext from './SketchDraw.context'
import SketchDrawEventListeners from './SketchDraw.eventListener'
import { CANVAS_ID } from './data/constants'
import type {
  ActionModeOption,
  CanvasObject,
  CommonObjectProperties
} from './data/types'
import useCircleOptions from './store/object/useCircleOptions'
import useEraserOptions from './store/object/useEraserOptions'
import useHighlighterOptions from './store/object/useHighlighterOptions'
import usePencilOptions from './store/object/usePencilOptions'
import useSquareOptions from './store/object/useSquareOptions'
import useTextOptions from './store/object/useTextOptions'
import useTriangleOptions from './store/object/useTriangleOptions'
import useActionMode from './store/useActionMode'
import useActiveObjectId from './store/useActiveObjectId'
import useCanvasBackgroundColor from './store/useCanvasBackgroundColor'
import useCanvasObjects from './store/useCanvasObjects'
import useCanvasWorkingSize from './store/useCanvasWorkingSize'
import useUserMode from './store/useUserMode'
import generateUniqueId from './utils/generateUniqueId'
import getControlPoints from './utils/getControlPoints'
import getCursorFromModes from './utils/getCursorFromModes'
import getDimensionsFromPointObject from './utils/getDimensionsFromPointObject'
import getRelativeMousePositionOnCanvas from './utils/getRelativeMousePositionOnCanvas'
import isCursorWithinRectangle from './utils/isCursorWithinRectangle'
import saveObjectsToStorage from './utils/saveObjectsToStorage'

type PointerOrTouchEvent = PointerEvent<HTMLElement> | TouchEvent<HTMLElement>

export default function SketchDraw() {
  const id = CANVAS_ID
  const { isReady, containerRef, canvasRef, contextRef, drawEverything } =
    useSketchDrawContext()

  const previousTouchRef = useRef<Touch | null>(null)
  const distanceBetweenTouchesRef = useRef<number>(0)
  const { activeObjectId, setActiveObjectId } = useActiveObjectId()
  const {
    canvasObjects,
    updateCanvasObject,
    appendPencilObject,
    appendHighlighterObject,
    appendEraserObject,
    appendCircleObject,
    appendSquareObject,
    appendTriangleObject,
    appendTextObject,
    appendPointToCanvasObject,
    moveCanvasObject,
    resizeCanvasObject
  } = useCanvasObjects()

  const { canvasBackgroundColor } = useCanvasBackgroundColor()
  const { canvasWorkingSize } = useCanvasWorkingSize()
  const { userMode, setUserMode } = useUserMode()
  const { actionMode, setActionMode } = useActionMode()

  //
  const { options: eraserOpts, setOptions: setEraserOptions } =
    useEraserOptions()
  const { options: pencilOpts, setOptions: setPencilOptions } =
    usePencilOptions()
  const { options: highlighterOpts, setOptions: setHighlighterOptions } =
    useHighlighterOptions()
  const { options: circleOpts, setOptions: setCircleOptions } =
    useCircleOptions()
  const { options: squareOpts, setOptions: setSquareOptions } =
    useSquareOptions()
  const { options: triangleOpts, setOptions: setTriangleOptions } =
    useTriangleOptions()
  const { options: textOpts, setOptions: setTextOptions } = useTextOptions()

  const zoom = 100

  const initialDrawingPositionRef = useRef<{ x: number; y: number }>({
    x: 0,
    y: 0
  })

  const activeObject = canvasObjects.find(
    (canvasObject) => canvasObject.id === activeObjectId
  )

  // On pointer down
  const onPointerDown = (event: PointerOrTouchEvent) => {
    event.preventDefault()
    const canvas = canvasRef.current
    const context = contextRef.current
    if (!canvas || !context) {
      return
    }

    const clientX =
      'clientX' in event ? event.clientX : event.touches[0]?.clientX
    const clientY =
      'clientY' in event ? event.clientY : event.touches[0]?.clientY

    const relativeMousePosition = getRelativeMousePositionOnCanvas({
      windowMouseX: clientX,
      windowMouseY: clientY,
      canvas: canvasRef.current!,
      zoom
    })

    initialDrawingPositionRef.current = {
      x: relativeMousePosition.relativeMouseX,
      y: relativeMousePosition.relativeMouseY
    }
    const createdObjectId = generateUniqueId()
    const commonObjectProperties: CommonObjectProperties = {
      id: createdObjectId,
      x: initialDrawingPositionRef.current.x,
      y: initialDrawingPositionRef.current.y,
      width: 0,
      height: 0
    }

    switch (userMode) {
      case 'icon':
      case 'image':
      case 'select': {
        let isResizing = false
        // Resize object
        if (activeObject) {
          const { position: _, ...boxes } = getControlPoints({
            canvasObject: activeObject,
            zoom
          })

          Object.entries(boxes).forEach(([boxName, box]) => {
            const isWithinBounds = isCursorWithinRectangle({
              x: box.x,
              y: box.y,
              width: box.width,
              height: box.height,
              relativeMouseX: initialDrawingPositionRef.current.x,
              relativeMouseY: initialDrawingPositionRef.current.y
            })

            if (isWithinBounds) {
              isResizing = true
              setActionMode({
                type: 'isResizing',
                option: boxName.split('Box')[0] as ActionModeOption
              })
            }
          })
        }

        if (!isResizing) {
          const clickedObjects = canvasObjects.filter((canvasObject) => {
            return isCursorWithinRectangle({
              x: canvasObject.x,
              y: canvasObject.y,
              width: canvasObject.width,
              height: canvasObject.height,
              relativeMouseX: initialDrawingPositionRef.current.x,
              relativeMouseY: initialDrawingPositionRef.current.y
            })
          })

          const clickedObject = clickedObjects[clickedObjects.length - 1]
          const wasClickInsideWorkingCanvas = isCursorWithinRectangle({
            x: 0,
            y: 0,
            width: canvasWorkingSize.width,
            height: canvasWorkingSize.height,
            relativeMouseX: initialDrawingPositionRef.current.x,
            relativeMouseY: initialDrawingPositionRef.current.y
          })
          const shouldClearSelection =
            !wasClickInsideWorkingCanvas && clickedObject?.id !== activeObjectId

          if (!shouldClearSelection && clickedObject?.id) {
            setActiveObjectId(clickedObject?.id)

            const canvasObject = canvasObjects.find(
              (canvasObject) => canvasObject.id === clickedObject?.id
            )

            // TODO: set selected options
            if (canvasObject) {
              setSelectedOptions(canvasObject)
            }
          } else {
            setActiveObjectId(clickedObject?.id || null)
          }

          if (clickedObject) {
            setUserMode('select')
            setActionMode({ type: 'isMoving' })
          } else {
            setActionMode({ type: 'isPanning' })
          }
        }
        drawEverything()
        break
      }
      case 'pencil': {
        appendPencilObject({
          ...commonObjectProperties,
          pencilOpts,
          points: [
            {
              x: initialDrawingPositionRef.current.x,
              y: initialDrawingPositionRef.current.y
            }
          ]
        })

        setActiveObjectId(createdObjectId)
        setActionMode({ type: 'isDrawing' })
        break
      }
      case 'highlighter': {
        appendHighlighterObject({
          ...commonObjectProperties,
          highlighterOpts,
          points: [
            {
              x: initialDrawingPositionRef.current.x,
              y: initialDrawingPositionRef.current.y
            }
          ]
        })

        setActiveObjectId(createdObjectId)
        setActionMode({ type: 'isDrawing' })
        break
      }
      case 'eraser': {
        appendEraserObject({
          ...commonObjectProperties,
          eraserOpts: {
            ...eraserOpts,
            strokeColorHex: canvasBackgroundColor
          },
          points: [
            {
              x: initialDrawingPositionRef.current.x,
              y: initialDrawingPositionRef.current.y
            }
          ]
        })

        setActiveObjectId(createdObjectId)
        setActionMode({ type: 'isDrawing' })
        break
      }
      case 'circle': {
        appendCircleObject({
          ...commonObjectProperties,
          circleOpts
        })

        setActiveObjectId(createdObjectId)
        setActionMode({ type: 'isDrawing' })
        break
      }
      case 'square': {
        appendSquareObject({
          ...commonObjectProperties,
          squareOpts
        })

        setActiveObjectId(createdObjectId)
        setActionMode({ type: 'isDrawing' })
        break
      }
      case 'triangle': {
        appendTriangleObject({
          ...commonObjectProperties,
          triangleOpts
        })

        setActiveObjectId(createdObjectId)
        setActionMode({ type: 'isDrawing' })
        break
      }
      case 'text': {
        appendTextObject({
          ...commonObjectProperties,
          textOpts
        })

        setActiveObjectId(createdObjectId)
        setUserMode('select')
        setActionMode(null)
        break
      }
      default:
        break
    }
  }

  // On pointer move
  const onPointerMove = (event: PointerOrTouchEvent) => {
    event.preventDefault()
    const canvas = canvasRef.current
    const context = contextRef.current
    if (!canvas || !context || !actionMode) {
      return
    }

    const clientX =
      'clientX' in event ? event.clientX : event.touches[0]?.clientX
    const clientY =
      'clientY' in event ? event.clientY : event.touches[0]?.clientY

    const finger0PageX = 'touches' in event ? event.touches[0]?.pageX : null
    const finger0PageY = 'touches' in event ? event.touches[0]?.pageY : null

    const finger1PageX = 'touches' in event ? event.touches[1]?.pageX : null
    const finger1PageY = 'touches' in event ? event.touches[1]?.pageY : null

    if (
      finger0PageX !== null &&
      finger0PageY !== null &&
      finger1PageX !== null &&
      finger1PageY !== null
    ) {
      const distanceBetweenTouches = Math.hypot(
        finger0PageX - finger1PageX,
        finger0PageY - finger1PageY
      )

      distanceBetweenTouchesRef.current = distanceBetweenTouches
    }

    const movementX =
      'movementX' in event
        ? event.movementX
        : previousTouchRef.current?.pageX
          ? event.touches[0].pageX - previousTouchRef.current.pageX
          : 0

    const movementY =
      'movementY' in event
        ? event.movementY
        : previousTouchRef.current?.pageY
          ? event.touches[0].pageY - previousTouchRef.current.pageY
          : 0

    if ('touches' in event) {
      previousTouchRef.current = event.touches[0]
    }

    const relativeMousePosition = getRelativeMousePositionOnCanvas({
      windowMouseX: clientX,
      windowMouseY: clientY,
      canvas: canvasRef.current!,
      zoom
    })

    const finalX = relativeMousePosition.relativeMouseX
    const finalY = relativeMousePosition.relativeMouseY

    switch (userMode) {
      case 'select': {
        if (activeObjectId && actionMode.type === 'isMoving') {
          moveCanvasObject({
            id: activeObjectId,
            deltaPosition: {
              deltaX: movementX / (zoom / 100),
              deltaY: movementY / (zoom / 100)
            },
            canvasWorkingSize
          })
        } else if (
          activeObjectId &&
          actionMode.type === 'isResizing' &&
          actionMode.option
        ) {
          resizeCanvasObject({
            id: activeObjectId,
            actionModeOption: actionMode.option,
            delta: {
              deltaX: movementX / (zoom / 100),
              deltaY: movementY / (zoom / 100)
            },
            canvasWorkingSize
          })
        }
        break
      }
      case 'pencil':
      case 'highlighter':
      case 'eraser': {
        if (activeObjectId) {
          appendPointToCanvasObject(activeObjectId, {
            x: finalX,
            y: finalY
          })
        }
        break
      }
      case 'circle':
      case 'square':
      case 'triangle': {
        if (activeObjectId) {
          const topLeftX = Math.min(initialDrawingPositionRef.current.x, finalX)
          const topLeftY = Math.min(initialDrawingPositionRef.current.y, finalY)

          const width = Math.abs(initialDrawingPositionRef.current.x - finalX)
          const height = Math.abs(initialDrawingPositionRef.current.y - finalY)

          updateCanvasObject(activeObjectId, {
            x: topLeftX,
            y: topLeftY,
            width,
            height
          })
        }
        break
      }
      default: {
        break
      }
    }
  }

  // On pointer up
  const onPointerUp = (event: PointerOrTouchEvent) => {
    event.preventDefault()
    setActionMode(null)
    const canvas = canvasRef.current
    const context = contextRef.current
    if (!canvas || !context) {
      return
    }

    previousTouchRef.current = null
    if ('touches' in event) {
      distanceBetweenTouchesRef.current = 0
    }

    switch (userMode) {
      case 'select': {
        break
      }
      case 'text': {
        break
      }
      case 'pencil':
      case 'highlighter':
      case 'eraser': {
        context.closePath()
        if (activeObject) {
          const dimensions = getDimensionsFromPointObject({
            obj: activeObject
          })
          updateCanvasObject(activeObject.id, {
            width: dimensions.width,
            height: dimensions.height
          })
        }
        drawEverything()
        break
      }
      case 'circle':
      case 'square':
      case 'triangle': {
        setUserMode('select')
        drawEverything()
        break
      }
      default: {
        break
      }
    }

    saveObjectsToStorage(canvasObjects)
  }

  // Helper
  const setSelectedOptions = (obj: CanvasObject) => {
    switch (obj.type) {
      case 'eraser':
        setEraserOptions(obj.eraserOpts! || eraserOpts)
        break
      case 'highlighter':
        setHighlighterOptions(obj.highlighterOpts! || highlighterOpts)
        break
      case 'pencil':
        setPencilOptions(obj.pencilOpts! || pencilOpts)
        break
      case 'circle':
        setCircleOptions(obj.circleOpts! || circleOpts)
        break
      case 'square':
        setSquareOptions(obj.squareOpts! || squareOpts)
        break
      case 'triangle':
        setTriangleOptions(obj.triangleOpts! || triangleOpts)
        break
      case 'text':
        setTextOptions(obj.textOpts! || textOpts)
        break

      default:
        break
    }
  }

  return (
    <div
      id={`${id}-container`}
      ref={containerRef}
      className="relative h-full overflow-hidden rounded-xl bg-white"
      style={{
        cursor: getCursorFromModes({ userMode, actionMode }),
        backgroundColor: canvasBackgroundColor
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onTouchStart={onPointerDown}
      onTouchMove={onPointerMove}
      onTouchEnd={onPointerUp}
    >
      {!isReady && (
        <div className="absolute z-30 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Loader2Icon className="w-12 h-12 animate-spin text-primary" />
        </div>
      )}
      <canvas
        id={`${id}-overlay`}
        width={canvasWorkingSize.width}
        height={canvasWorkingSize.height}
        className="absolute top-0 left-0 z-50"
      />
      <canvas
        id={id}
        ref={canvasRef}
        width={canvasWorkingSize.width}
        height={canvasWorkingSize.height}
        style={{
          backgroundColor: canvasBackgroundColor
        }}
      />
      <SketchDrawEventListeners />
    </div>
  )
}

import React, {
  type PointerEvent,
  type Touch,
  type TouchEvent,
  useRef
} from 'react'

import useSketchDrawContext from './SketchDraw.context'
import SketchDrawEventListeners from './SketchDraw.eventListener'
import { CANVAS_ID, COMMON_DEFAULT } from './data/constants'
import type { ActionModeOption } from './data/types'
import useActionMode from './store/useActionMode'
import useActiveObjectId from './store/useActiveObjectId'
import useCanvasBackgroundColor from './store/useCanvasBackgroundColor'
import useCanvasObjects from './store/useCanvasObjects'
import useCanvasWorkingSize from './store/useCanvasWorkingSize'
import useSelectedColor from './store/useSelectedColor'
import useShapeType from './store/useShapeType'
import useStrokeWidth from './store/useStrokeWidth'
import useUserMode from './store/useUserMode'
import generateUniqueId from './utils/generateUniqueId'
import getControlPoints from './utils/getControlPoints'
import getCursorFromModes from './utils/getCursorFromModes'
import getDimensionsFromFreeDraw from './utils/getDimensionsFromFreeDraw'
import getObjectColor from './utils/getObjectColor'
import getRelativeMousePositionOnCanvas from './utils/getRelativeMousePositionOnCanvas'
import isCursorWithinRectangle from './utils/isCursorWithinRectangle'
import isHexLight from './utils/isHexLight'
import saveObjectsToStorage from './utils/saveObjectsToStorage'

type PointerOrTouchEvent = PointerEvent<HTMLElement> | TouchEvent<HTMLElement>

export default function SketchDraw() {
  const id = CANVAS_ID
  const { containerRef, canvasRef, contextRef, drawEverything } =
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
    appendFreeDrawPointToCanvasObject,
    moveCanvasObject,
    resizeCanvasObject
  } = useCanvasObjects()

  const { canvasBackgroundColor } = useCanvasBackgroundColor()
  const { canvasWorkingSize } = useCanvasWorkingSize()
  const { userMode, setUserMode } = useUserMode()
  const { actionMode, setActionMode } = useActionMode()
  const { selectedColor, setSelectedColor } = useSelectedColor()
  const { strokeWidth } = useStrokeWidth()
  const { shapeType } = useShapeType()

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

            if (canvasObject && getObjectColor(canvasObject)) {
              setSelectedColor(getObjectColor(canvasObject) as string)
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
          id: createdObjectId,
          x: initialDrawingPositionRef.current.x,
          y: initialDrawingPositionRef.current.y,
          width: 0,
          height: 0,
          strokeWidth:
            strokeWidth['pencil'] || COMMON_DEFAULT.strokeWidth.pencil,
          opacity: 100,
          freeDrawPoints: [
            {
              x: initialDrawingPositionRef.current.x,
              y: initialDrawingPositionRef.current.y
            }
          ],
          strokeColorHex: selectedColor
        })
        setActiveObjectId(createdObjectId)
        setActionMode({ type: 'isDrawing' })
        break
      }
      case 'highlighter': {
        appendHighlighterObject({
          id: createdObjectId,
          x: initialDrawingPositionRef.current.x,
          y: initialDrawingPositionRef.current.y,
          width: 0,
          height: 0,
          strokeWidth:
            strokeWidth['highlighter'] ||
            COMMON_DEFAULT.strokeWidth.highlighter,
          opacity: 55,
          freeDrawPoints: [
            {
              x: initialDrawingPositionRef.current.x,
              y: initialDrawingPositionRef.current.y
            }
          ],
          strokeColorHex: selectedColor
        })
        setActiveObjectId(createdObjectId)
        setActionMode({ type: 'isDrawing' })
        break
      }
      case 'eraser': {
        appendEraserObject({
          id: createdObjectId,
          x: initialDrawingPositionRef.current.x,
          y: initialDrawingPositionRef.current.y,
          width: 0,
          height: 0,
          strokeWidth:
            strokeWidth['eraser'] || COMMON_DEFAULT.strokeWidth.eraser,
          opacity: 100,
          freeDrawPoints: [
            {
              x: initialDrawingPositionRef.current.x,
              y: initialDrawingPositionRef.current.y
            }
          ],
          strokeColorHex: canvasBackgroundColor
        })
        setActiveObjectId(createdObjectId)
        setActionMode({ type: 'isDrawing' })
        break
      }
      case 'circle': {
        appendCircleObject({
          id: createdObjectId,
          x: initialDrawingPositionRef.current.x,
          y: initialDrawingPositionRef.current.y,
          width: 0,
          height: 0,
          strokeWidth:
            shapeType === 'outline'
              ? strokeWidth['circle'] || COMMON_DEFAULT.strokeWidth.circle || 1
              : 0,
          opacity: 100,
          borderRadius: 0,
          backgroundColorHex: shapeType === 'outline' ? '' : selectedColor,
          strokeColorHex:
            shapeType === 'outline'
              ? selectedColor
              : isHexLight(selectedColor)
                ? '#000000'
                : '#ffffff'
        })
        setActiveObjectId(createdObjectId)
        setActionMode({ type: 'isDrawing' })
        break
      }
      case 'square': {
        appendSquareObject({
          id: createdObjectId,
          x: initialDrawingPositionRef.current.x,
          y: initialDrawingPositionRef.current.y,
          width: 0,
          height: 0,
          strokeWidth:
            shapeType === 'outline'
              ? strokeWidth['square'] || COMMON_DEFAULT.strokeWidth.square || 1
              : 0,
          opacity: 100,
          borderRadius: 0,
          backgroundColorHex: shapeType === 'outline' ? '' : selectedColor,
          strokeColorHex:
            shapeType === 'outline'
              ? selectedColor
              : isHexLight(selectedColor)
                ? '#000000'
                : '#ffffff'
        })
        setActiveObjectId(createdObjectId)
        setActionMode({ type: 'isDrawing' })
        break
      }
      case 'triangle': {
        appendTriangleObject({
          id: createdObjectId,
          x: initialDrawingPositionRef.current.x,
          y: initialDrawingPositionRef.current.y,
          width: 0,
          height: 0,
          strokeWidth:
            shapeType === 'outline'
              ? strokeWidth['triangle'] ||
                COMMON_DEFAULT.strokeWidth.triangle ||
                1
              : 0,
          opacity: 100,
          borderRadius: 0,
          backgroundColorHex: shapeType === 'outline' ? '' : selectedColor,
          strokeColorHex:
            shapeType === 'outline'
              ? selectedColor
              : isHexLight(selectedColor)
                ? '#000000'
                : '#ffffff'
        })
        setActiveObjectId(createdObjectId)
        setActionMode({ type: 'isDrawing' })
        break
      }
      case 'text': {
        appendTextObject({
          id: createdObjectId,
          x: initialDrawingPositionRef.current.x,
          y: initialDrawingPositionRef.current.y,
          width: 200,
          height: 100,
          text: 'Add text',
          textAlignHorizontal: 'center',
          textAlignVertical: 'middle',
          textJustify: false,
          fontSize: 44,
          fontFamily: 'sans-serif',
          fontStyle: 'normal',
          fontWeight: 'normal',
          fontVariant: 'normal',
          fontLineHeightRatio: 1,
          fontColorHex: selectedColor,
          opacity: 100
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
          appendFreeDrawPointToCanvasObject(activeObjectId, {
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
          const dimensions = getDimensionsFromFreeDraw({
            freeDrawObject: activeObject
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

  return (
    <div
      id={`${id}-container`}
      ref={containerRef}
      className="relative h-full overflow-hidden rounded-xl bg-white"
      style={{
        cursor: getCursorFromModes({ userMode, actionMode })
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onTouchStart={onPointerDown}
      onTouchMove={onPointerMove}
      onTouchEnd={onPointerUp}
    >
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

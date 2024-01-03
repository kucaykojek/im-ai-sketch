import { fabric } from 'fabric'

import { CANVAS_ID, PRIMARY_COLOR_HEX } from '@/sketch-draw/data/constants'
import type {
  ActionMode,
  CanvasObject,
  CanvasWorkingSize,
  UserMode
} from '@/sketch-draw/data/types'

import getControlPoints from './getControlPoints'
import hexToRgba from './hexToRgba'
import renderCircle from './render/renderCircle'
import renderEraser from './render/renderEraser'
import renderHighlighter from './render/renderHighlighter'
import renderSVGIcon from './render/renderIcon'
import renderImage from './render/renderImage'
import renderPencil from './render/renderPencil'
import renderSquare from './render/renderSquare'
import renderText from './render/renderText'
import renderTriangle from './render/renderTriangle'

export default function canvasDrawEverything({
  fabricCanvas,
  canvas,
  context,
  canvasWorkingSize,
  canvasBackgroundColor,
  canvasObjects,
  activeObjectId,
  actionMode,
  userMode,
  zoom,
  containerSize
}: {
  fabricCanvas: fabric.Canvas | null
  canvas: HTMLCanvasElement | null
  context: CanvasRenderingContext2D | null
  canvasWorkingSize: CanvasWorkingSize
  canvasBackgroundColor: string
  canvasObjects: CanvasObject[]
  activeObjectId: string | null
  actionMode: ActionMode
  userMode: UserMode
  zoom: number
  containerSize: { width: number; height: number }
}) {
  if (!canvas || !context) {
    return
  }

  // Draw background
  context.clearRect(0, 0, canvas.width, canvas.height)

  context.fillStyle = canvasBackgroundColor
  context.fillRect(0, 0, canvasWorkingSize.width, canvasWorkingSize.height)

  // Draw objects
  canvasObjects.forEach((object) => {
    switch (object.type) {
      case 'eraser': {
        renderEraser({ context, ...object })
        break
      }
      case 'highlighter': {
        renderHighlighter({ context, ...object })
        break
      }
      case 'pencil': {
        renderPencil({ context, ...object })
        break
      }
      case 'circle': {
        renderCircle({ context, ...object })
        break
      }
      case 'square': {
        renderSquare({ context, ...object, canvas: fabricCanvas })
        break
      }
      case 'triangle': {
        renderTriangle({ context, ...object })
        break
      }
      case 'text': {
        renderText({ context, ...object })
        break
      }
      case 'icon': {
        renderSVGIcon({ context, ...object })
        break
      }
      case 'image': {
        renderImage({ context, ...object })
        break
      }
      default:
        break
    }
  })

  const activeObject = canvasObjects.find(
    (object) => object.id === activeObjectId
  )

  const canvasOverlayContext = (
    document.getElementById(`${CANVAS_ID}-overlay`) as HTMLCanvasElement
  )?.getContext('2d')

  if (canvasOverlayContext) {
    canvasOverlayContext.clearRect(
      0,
      0,
      containerSize.width,
      containerSize.height
    )

    if (
      activeObject &&
      actionMode?.type !== 'isDrawing' &&
      userMode === 'select'
    ) {
      const zoomRatio = zoom / 100

      // We adjust here and then multiply by zoomRatio to make the controls go outside the canvas
      const positionAdjustment = {
        x: (canvasWorkingSize.width - canvasWorkingSize.width * zoomRatio) / 2,
        y: (canvasWorkingSize.height - canvasWorkingSize.height * zoomRatio) / 2
      }

      // Draw controls
      const {
        position,
        topLeftBox,
        topCenterBox,
        topRightBox,
        middleLeftBox,
        middleRightBox,
        bottomLeftBox,
        bottomCenterBox,
        bottomRightBox
      } = getControlPoints({
        canvasObject: activeObject,
        zoom
      })

      canvasOverlayContext.lineWidth = 2
      canvasOverlayContext.strokeStyle = hexToRgba({
        hex: PRIMARY_COLOR_HEX,
        opacity: 80
      })
      canvasOverlayContext.strokeRect(
        position.x * zoomRatio + positionAdjustment.x,
        position.y * zoomRatio + positionAdjustment.y,
        position.width * zoomRatio,
        position.height * zoomRatio
      )
      canvasOverlayContext.setLineDash([0, 0])
      canvasOverlayContext.fillStyle = hexToRgba({
        hex: PRIMARY_COLOR_HEX,
        opacity: 100
      })
      ;[
        topLeftBox,
        topCenterBox,
        topRightBox,
        middleLeftBox,
        middleRightBox,
        bottomLeftBox,
        bottomCenterBox,
        bottomRightBox
      ].forEach((box) => {
        canvasOverlayContext.fillRect(
          box.x * zoomRatio + positionAdjustment.x,
          box.y * zoomRatio + positionAdjustment.y,
          box.width * zoomRatio,
          box.height * zoomRatio
        )
      })
    }
  }
}

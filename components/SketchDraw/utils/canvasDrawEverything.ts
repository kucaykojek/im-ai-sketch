import { CANVAS_ID } from '../data/constants'
import type {
  ActionMode,
  CanvasObject,
  CanvasWorkingSize,
  UserMode
} from '../data/types'
import getControlPoints from './getControlPoints'
import hexToRgba from './hexToRgba'
import isHexLight from './isHexLight'
import renderFreeDrawing from './render/renderFreeDrawing'
import renderImage from './render/renderImage'
import renderSVGIcon from './render/renderSVGIcon'
import renderShapeCircle from './render/renderShapeCircle'
import renderShapeSquare from './render/renderShapeSquare'
import renderShapeTriangle from './render/renderShapeTriangle'
import renderText from './render/renderText'

export default function canvasDrawEverything({
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
      case 'pencil':
      case 'highlighter':
      case 'eraser': {
        renderFreeDrawing({ context, ...object })
        break
      }
      case 'circle': {
        renderShapeCircle({ context, ...object })
        break
      }
      case 'square': {
        renderShapeSquare({ context, ...object })
        break
      }
      case 'triangle': {
        renderShapeTriangle({ context, ...object })
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
        hex: isHexLight(canvasBackgroundColor) ? '#000000' : '#ffffff',
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
        hex: isHexLight(canvasBackgroundColor) ? '#000000' : '#ffffff',
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

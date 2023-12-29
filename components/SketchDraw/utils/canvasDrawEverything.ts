import { CANVAS_ID } from '../data/constants'
import type {
  ActionMode,
  CanvasObject,
  CanvasWorkingSize,
  ScrollPosition
} from '../data/types'
import getControlPoints from './getControlPoints'
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
  zoom,
  scrollPosition,
  containerSize
}: {
  canvas: HTMLCanvasElement | null
  context: CanvasRenderingContext2D | null
  canvasWorkingSize: CanvasWorkingSize
  canvasBackgroundColor: string
  canvasObjects: CanvasObject[]
  activeObjectId: string | null
  actionMode: ActionMode
  zoom: number
  scrollPosition: ScrollPosition
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

  const canvasContext = (
    document.getElementById(CANVAS_ID) as HTMLCanvasElement
  )?.getContext('2d')

  if (canvasContext) {
    canvasContext.clearRect(0, 0, containerSize.width, containerSize.height)

    if (activeObject && actionMode?.type !== 'isDrawing') {
      const zoomRatio = zoom / 100

      // We adjust here and then multiply by zoomRatio to make the controls go outside the canvas
      const positionAdjustment = {
        x:
          scrollPosition.x +
          (canvasWorkingSize.width - canvasWorkingSize.width * zoomRatio) / 2,
        y:
          scrollPosition.y +
          (canvasWorkingSize.height - canvasWorkingSize.height * zoomRatio) / 2
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

      canvasContext.lineWidth = 2
      canvasContext.strokeStyle = '#ff0000' // red
      canvasContext.strokeRect(
        position.x * zoomRatio + positionAdjustment.x,
        position.y * zoomRatio + positionAdjustment.y,
        position.width * zoomRatio,
        position.height * zoomRatio
      )
      canvasContext.setLineDash([0, 0])
      canvasContext.fillStyle = '#ff0000'
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
        canvasContext.fillRect(
          box.x * zoomRatio + positionAdjustment.x,
          box.y * zoomRatio + positionAdjustment.y,
          box.width * zoomRatio,
          box.height * zoomRatio
        )
      })
    }
  }
}

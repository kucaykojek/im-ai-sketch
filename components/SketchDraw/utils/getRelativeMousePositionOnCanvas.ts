export default function getRelativeMousePositionOnCanvas({
  windowMouseX,
  windowMouseY,
  canvas,
  zoom
}: {
  windowMouseX: number
  windowMouseY: number
  canvas: HTMLCanvasElement
  zoom: number
}): {
  relativeMouseX: number
  relativeMouseY: number
} {
  const {
    left: canvasLeft,
    top: canvasTop,
    width: canvasWidth,
    height: canvasHeight
  } = canvas.getBoundingClientRect()

  const zoomRatio = zoom / 100

  const canvasNewWidth = canvasWidth * zoomRatio
  const canvasNewHeight = canvasHeight * zoomRatio

  const gutterX = (canvasWidth - canvasNewWidth) / 2
  const gutterY = (canvasHeight - canvasNewHeight) / 2

  const relativeMouseX = (windowMouseX - gutterX) / zoomRatio - canvasLeft
  const relativeMouseY = (windowMouseY - gutterY) / zoomRatio - canvasTop

  return {
    relativeMouseX,
    relativeMouseY
  }
}

import type { HightlighterObject } from '@/sketch-draw/data/types'
import getPositionFromDrawingPoints from '@/sketch-draw/utils/getPositionFromDrawingPoints'
import hexToRgba from '@/sketch-draw/utils/hexToRgba'

export default function renderHighlighter({
  context,
  x,
  y,
  highlighterOpts: opts,
  points
}: {
  context: CanvasRenderingContext2D
} & Omit<HightlighterObject, 'type'>): void {
  if (opts && points) {
    context.strokeStyle = hexToRgba({
      hex: opts.strokeColorHex,
      opacity: opts.opacity
    })

    context.lineCap = opts.lineCap
    context.lineWidth = opts.strokeThickness
    context.beginPath()

    const positionFromDrawingPoints = getPositionFromDrawingPoints({
      points
    })

    points.forEach((point, index) => {
      const realX = x - positionFromDrawingPoints.x + point.x
      const realY = y - positionFromDrawingPoints.y + point.y

      if (index === 0) {
        context.moveTo(realX, realY)
      } else {
        context.lineTo(realX, realY)
      }
    })
    context.stroke()
    context.closePath()
  }
}

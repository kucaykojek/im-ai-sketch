import type { ShapeObject } from '../../data/types'
import hexToRgba from '../hexToRgba'

export default function renderShapeCircle({
  context,
  x,
  y,
  width,
  height,
  backgroundColorHex,
  strokeColorHex,
  strokeWidth,
  opacity
}: {
  context: CanvasRenderingContext2D
} & Omit<ShapeObject, 'type'>): void {
  context.save()

  if (!!backgroundColorHex) {
    context.fillStyle = hexToRgba({ hex: backgroundColorHex, opacity })
  }

  context.strokeStyle = hexToRgba({
    hex: strokeColorHex,
    opacity: strokeWidth ? opacity : 0
  })
  context.lineWidth = strokeWidth
  context.beginPath()

  context.ellipse(
    x + width / 2,
    y + height / 2,
    width / 2,
    height / 2,
    0,
    0,
    2 * Math.PI
  )

  if (!!backgroundColorHex) {
    context.fill()
  }
  context.stroke()
  context.restore()
}

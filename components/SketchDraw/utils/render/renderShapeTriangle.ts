import type { ShapeObject } from '../../data/types'
import hexToRgba from '../hexToRgba'

export default function renderShapeTriangle({
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
  const triangle = {
    x1: x + width / 2,
    y1: y,
    x2: x,
    y2: y + height,
    x3: x + width,
    y3: y + height
  }

  context.save()
  context.fillStyle = hexToRgba({ hex: backgroundColorHex, opacity })
  context.strokeStyle = hexToRgba({
    hex: strokeColorHex,
    opacity: strokeWidth ? opacity : 0
  })
  context.lineWidth = strokeWidth
  context.beginPath()
  context.moveTo(triangle.x1, triangle.y1)
  context.lineTo(triangle.x2, triangle.y2)
  context.lineTo(triangle.x3, triangle.y3)
  context.closePath()
  context.fill()
  context.stroke()
  context.restore()
}

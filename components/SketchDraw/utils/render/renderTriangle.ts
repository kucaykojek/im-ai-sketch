import type { TriangleObject } from '@/sketch-draw/data/types'
import hexToRgba from '@/sketch-draw/utils/hexToRgba'

export default function renderTriangle({
  context,
  x,
  y,
  width,
  height,
  triangleOpts: opts
}: {
  context: CanvasRenderingContext2D
} & Omit<TriangleObject, 'type'>): void {
  if (opts) {
    const triangle = {
      x1: x + width / 2,
      y1: y,
      x2: x,
      y2: y + height,
      x3: x + width,
      y3: y + height
    }

    context.save()

    if (opts.shapeType === 'fill') {
      context.fillStyle = hexToRgba({
        hex: opts.fillColorHex,
        opacity: opts.opacity
      })
    }

    context.strokeStyle = hexToRgba({
      hex: opts.strokeColorHex,
      opacity:
        opts.strokeThickness || opts.shapeType === 'outline' ? opts.opacity : 0
    })
    context.lineWidth =
      opts.shapeType === 'outline' && !opts.strokeThickness
        ? 1
        : opts.strokeThickness
    context.beginPath()
    context.moveTo(triangle.x1, triangle.y1)
    context.lineTo(triangle.x2, triangle.y2)
    context.lineTo(triangle.x3, triangle.y3)
    context.closePath()

    if (opts.shapeType === 'fill') {
      context.fill()
    }
    context.stroke()
    context.restore()
  }
}

import type { SquareObject } from '@/sketch-draw/data/types'
import hexToRgba from '@/sketch-draw/utils/hexToRgba'

export default function renderSquare({
  context,
  x,
  y,
  width,
  height,
  squareOpts: opts
}: {
  context: CanvasRenderingContext2D
} & Omit<SquareObject, 'type'>): void {
  if (opts) {
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

    const halfStrokeWidth = opts.strokeThickness / 2

    if (opts.shapeType === 'fill') {
      context.fillRect(x, y, width, height)
    }
    context.beginPath()

    if (halfStrokeWidth) {
      context.lineWidth = halfStrokeWidth
      context.strokeRect(
        x + halfStrokeWidth / 2,
        y + halfStrokeWidth / 2,
        width - halfStrokeWidth,
        height - halfStrokeWidth
      )
    }
  }
}

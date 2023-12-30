import type { CircleObject } from '@/sketch-draw/data/types'
import hexToRgba from '@/sketch-draw/utils/hexToRgba'

export default function renderCircle({
  context,
  x,
  y,
  width,
  height,
  circleOpts: opts
}: {
  context: CanvasRenderingContext2D
} & Omit<CircleObject, 'type'>): void {
  if (opts) {
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

    context.ellipse(
      x + width / 2,
      y + height / 2,
      width / 2,
      height / 2,
      0,
      0,
      2 * Math.PI
    )

    if (opts.shapeType === 'fill') {
      context.fill()
    }
    context.stroke()
    context.restore()
  }
}

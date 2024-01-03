import { fabric } from 'fabric'

import type { SquareObject } from '@/sketch-draw/data/types'
import hexToRgba from '@/sketch-draw/utils/hexToRgba'

// const c: Canvas = new fabric.Canvas('c');
export default function renderSquare({
  context,
  x,
  y,
  width,
  height,
  squareOpts: opts,
  canvas
}: {
  context: CanvasRenderingContext2D
  canvas: fabric.Canvas | null
} & Omit<SquareObject, 'type'>): void {
  console.log(canvas)
  if (opts) {
    const obj = new fabric.Triangle({
      top: x,
      left: y,
      width,
      height,
      fill: opts.fillColorHex,
      stroke: opts.strokeColorHex,
      strokeWidth: opts.strokeThickness
    })
    // if (opts.shapeType === 'fill') {
    //   context.fillStyle = hexToRgba({
    //     hex: opts.fillColorHex,
    //     opacity: opts.opacity
    //   })
    // }

    // context.strokeStyle = hexToRgba({
    //   hex: opts.strokeColorHex,
    //   opacity:
    //     opts.strokeThickness || opts.shapeType === 'outline' ? opts.opacity : 0
    // })

    // const halfStrokeWidth = opts.strokeThickness / 2

    // if (opts.shapeType === 'fill') {
    //   context.fillRect(x, y, width, height)
    // }
    // context.beginPath()

    // if (halfStrokeWidth) {
    //   context.lineWidth = halfStrokeWidth
    //   context.strokeRect(
    //     x + halfStrokeWidth / 2,
    //     y + halfStrokeWidth / 2,
    //     width - halfStrokeWidth,
    //     height - halfStrokeWidth
    //   )
    // }
    canvas?.add(obj)
    canvas?.setActiveObject(obj)
  }
}

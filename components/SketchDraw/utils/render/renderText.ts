import canvasTxt from 'canvas-txt'

import type { TextObject } from '@/sketch-draw/data/types'
import hexToRgba from '@/sketch-draw/utils/hexToRgba'

export default function renderText({
  context,
  x,
  y,
  width,
  height,
  textOpts: opts
}: {
  context: CanvasRenderingContext2D
} & Omit<TextObject, 'type'>): void {
  if (opts) {
    context.beginPath()
    context.fillStyle = hexToRgba({ hex: opts.fontColorHex, opacity: 100 })

    canvasTxt.debug = false

    canvasTxt.fontSize = opts.fontSize
    canvasTxt.font = opts.fontFamily

    canvasTxt.drawText(context, opts.text, x, y, width, height)

    context.closePath()
  }
}

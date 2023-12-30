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

    canvasTxt.justify = false
    canvasTxt.align = 'center'
    canvasTxt.vAlign = 'middle'
    canvasTxt.fontSize = opts.fontSize
    canvasTxt.font = opts.fontFamily
    canvasTxt.fontStyle = 'normal'
    canvasTxt.fontVariant = 'normal'
    canvasTxt.fontWeight = 'normal'
    canvasTxt.lineHeight = 1 * opts.fontSize

    canvasTxt.drawText(context, opts.text, x, y, width, height)

    context.closePath()
  }
}

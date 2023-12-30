import svgpath from 'svgpath'

import type { IconObject } from '@/sketch-draw/data/types'
import getDimensionsFromIconObject from '@/sketch-draw/utils/getDimensionsFromIconObject'
import hexToRgba from '@/sketch-draw/utils/hexToRgba'

export default function renderSVGIcon({
  context,
  x,
  y,
  width,
  height,
  iconOpts: opts
}: {
  context: CanvasRenderingContext2D
} & Omit<IconObject, 'type'>): void {
  if (opts) {
    context.fillStyle = hexToRgba({ hex: opts.bgColorHex, opacity: 100 })

    const dimensions = getDimensionsFromIconObject({
      context,
      iconObject: { x, y, width, height, iconOpts: opts }
    })

    const transformed = svgpath(opts.svgPath)
      .rel()
      .scale(dimensions.widthRatio, dimensions.heightRatio)
      .translate(x - dimensions.svgAdjustedX, y - dimensions.svgAdjustedY)
      .toString()

    context.beginPath()

    const path2d = new Path2D(transformed)

    context.fill(path2d)

    context.closePath()
  }
}

import type { ImageObject } from '@/sketch-draw/data/types'

export default function renderImage({
  context,
  x,
  y,
  width,
  height,
  imageOpts: opts
}: {
  context: CanvasRenderingContext2D
} & Omit<ImageObject, 'type'>): void {
  if (opts?.imageElement) {
    context.globalAlpha = 1 // opacity
    context.drawImage(opts.imageElement, x, y, width, height)
  }
}

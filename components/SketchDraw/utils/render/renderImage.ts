import type { ImageObject } from '@/sketch-draw/data/types'

import getImageElementFromUrl from '../getImageElementFromUrl'

export default async function renderImage({
  context,
  x,
  y,
  width,
  height,
  imageOpts: opts
}: {
  context: CanvasRenderingContext2D
} & Omit<ImageObject, 'type'>): Promise<void> {
  if (opts?.imageUrl || opts?.imageElement) {
    context.globalAlpha = 1 // opacity

    if (opts.imageElement) {
      context.drawImage(opts.imageElement, x, y, width, height)
    } else {
      const imageElement = await getImageElementFromUrl(opts?.imageUrl)
      context.drawImage(imageElement, x, y, width, height)
    }
  }
}

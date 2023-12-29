import type { CanvasObject } from '../data/types'

export default function getPositionFromDrawingPoints({
  freeDrawPoints
}: {
  freeDrawPoints: CanvasObject['freeDrawPoints']
}): {
  x: number
  y: number
} {
  return {
    x: Math.min(...freeDrawPoints.map((point) => point.x)),
    y: Math.min(...freeDrawPoints.map((point) => point.y))
  }
}

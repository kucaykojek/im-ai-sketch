import type { CanvasObject } from '@/sketch-draw/data/types'

export default function getPositionFromDrawingPoints({
  points
}: {
  points: CanvasObject['points']
}): {
  x: number
  y: number
} {
  return {
    x: Math.min(...points!.map((point) => point.x)),
    y: Math.min(...points!.map((point) => point.y))
  }
}

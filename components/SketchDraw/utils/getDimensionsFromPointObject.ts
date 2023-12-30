import type { CanvasObject, ObjectDimensions } from '@/sketch-draw/data/types'

import getPositionFromDrawingPoints from './getPositionFromDrawingPoints'

export default function getDimensionsFromPointObject({
  obj
}: {
  obj: Pick<CanvasObject, 'x' | 'y' | 'points'>
}): ObjectDimensions {
  const positionFromDrawingPoints = getPositionFromDrawingPoints({
    points: obj.points
  })

  const x =
    Math.min(...obj.points!.map((p) => p.x)) +
      obj.x -
      positionFromDrawingPoints.x || 0

  const y =
    Math.min(...obj.points!.map((p) => p.y)) +
      obj.y -
      positionFromDrawingPoints.y || 0

  const width =
    Math.max(...obj.points!.map((p) => p.x)) -
    Math.min(...obj.points!.map((p) => p.x))

  const height =
    Math.max(...obj.points!.map((p) => p.y)) -
    Math.min(...obj.points!.map((p) => p.y))

  return {
    x,
    y,
    width,
    height
  }
}

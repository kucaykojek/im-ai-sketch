import type {
  CanvasObject,
  HighlighterObject,
  PencilObject,
  SprayObject
} from '@/components/SketchDraw/data/types'

export const getSelectedType = (obj: CanvasObject) => {
  if (!obj) {
    return null
  }

  return obj.type !== 'path'
    ? obj.type
    : isPencilObject(obj)
      ? 'pencil'
      : isSprayObject(obj)
        ? 'spray'
        : isHighlighterObject(obj)
          ? 'highlighter'
          : null
}

export const isPencilObject = (obj: CanvasObject) => {
  if (!obj) {
    return false
  }

  if ((obj as PencilObject)?.type?.length) {
    return (
      !!(obj as PencilObject).stroke &&
      !!(obj as PencilObject).strokeLineJoin &&
      (obj as PencilObject).strokeLineCap === 'round'
    )
  } else {
    return false
  }
}

export const isSprayObject = (obj: CanvasObject) => {
  if (!obj) {
    return false
  }

  if ((obj as SprayObject)?.type?.length) {
    return (
      !!(obj as SprayObject).stroke &&
      !!(obj as SprayObject).strokeLineJoin &&
      (obj as SprayObject).strokeLineCap === 'round'
    )
  } else {
    return false
  }
}

export const isHighlighterObject = (obj: CanvasObject) => {
  if (!obj) {
    return false
  }

  if ((obj as HighlighterObject)?.type?.length) {
    return (
      !!(obj as HighlighterObject).stroke &&
      !!(obj as HighlighterObject).strokeLineJoin &&
      (obj as HighlighterObject).strokeLineCap === 'butt'
    )
  } else {
    return false
  }
}

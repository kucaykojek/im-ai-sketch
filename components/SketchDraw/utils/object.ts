import { FabricObject } from 'fabric'

import {
  ERASER_OPTIONS_DEFAULT,
  HIGHLIGHTER_OPTIONS_DEFAULT,
  PENCIL_OPTIONS_DEFAULT
} from '../data/constants'
import type {
  EraserObject,
  HighlighterObject,
  PencilObject
} from '../data/types'

export const getSelectedType = (obj: FabricObject) => {
  if (!obj) {
    return null
  }

  return obj.get('type') !== 'path'
    ? obj.get('type')
    : isPencilObject(obj)
      ? 'pencil'
      : isEraserObject(obj)
        ? 'eraser'
        : isHighlighterObject(obj)
          ? 'highlighter'
          : null
}

export const isPencilObject = (obj: FabricObject) => {
  if (!obj) {
    return false
  }

  if ((obj as PencilObject)?.type?.length) {
    return (
      !!(obj as PencilObject).stroke &&
      !!(obj as PencilObject).strokeLineJoin &&
      (obj as PencilObject).strokeLineCap ===
        PENCIL_OPTIONS_DEFAULT.strokeLineCap
    )
  } else {
    return false
  }
}

export const isEraserObject = (obj: FabricObject) => {
  if (!obj) {
    return false
  }

  if ((obj as EraserObject)?.type?.length) {
    return (
      !!(obj as EraserObject).stroke &&
      !!(obj as EraserObject).strokeLineCap &&
      (obj as EraserObject).strokeLineJoin ===
        ERASER_OPTIONS_DEFAULT.strokeLineJoin
    )
  } else {
    return false
  }
}

export const isHighlighterObject = (obj: FabricObject) => {
  if (!obj) {
    return false
  }

  if ((obj as HighlighterObject)?.type?.length) {
    return (
      !!(obj as HighlighterObject).stroke &&
      !!(obj as HighlighterObject).strokeLineJoin &&
      (obj as HighlighterObject).strokeLineCap ===
        HIGHLIGHTER_OPTIONS_DEFAULT.strokeLineCap
    )
  } else {
    return false
  }
}

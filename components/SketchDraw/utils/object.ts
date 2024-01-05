import { Canvas, FabricObject, util } from 'fabric'

import type {
  EraserObject,
  HighlighterObject,
  PencilObject
} from '@/components/SketchDraw/data/types'

import {
  ERASER_OPTIONS_DEFAULT,
  HIGHLIGHTER_OPTIONS_DEFAULT,
  OBJECTS_STORAGE_KEY,
  PENCIL_OPTIONS_DEFAULT
} from '../data/constants'

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

export const drawObjectsFromStorage = async (canvas: Canvas) => {
  if (!canvas) {
    return
  }

  const objectsOnStorage =
    localStorage && localStorage.getItem(OBJECTS_STORAGE_KEY)
  const objects = objectsOnStorage ? JSON.parse(objectsOnStorage) : []

  const revivedObjects = await util.enlivenObjects(objects)
  revivedObjects.forEach((obj) => {
    canvas.add(obj as FabricObject)
  })

  canvas.requestRenderAll()
}

export const saveObjectsToStorage = (objects: FabricObject[]) => {
  if (localStorage) {
    localStorage.setItem(OBJECTS_STORAGE_KEY, JSON.stringify(objects))
  }
}

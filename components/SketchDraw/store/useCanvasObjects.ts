import { create } from 'zustand'

import { CANVAS_OBJECT_DEFAULT } from '@/sketch-draw/data/constants'
import type {
  ActionModeOption,
  CanvasObject,
  CanvasWorkingSize,
  CircleObject,
  EraserObject,
  HightlighterObject,
  IconObject,
  ImageObject,
  PencilObject,
  SquareObject,
  TextObject,
  TriangleObject
} from '@/sketch-draw/data/types'
import generateUniqueId from '@/sketch-draw/utils/generateUniqueId'
import getPositionFromDrawingPoints from '@/sketch-draw/utils/getPositionFromDrawingPoints'

function curateObjectModifications(
  newObject: CanvasObject,
  existing: CanvasObject
) {
  const hasNegativeSize = newObject.width < 1 || newObject.height < 1

  if (hasNegativeSize) {
    return existing
  }

  const isTextWithLessThanThreshold =
    newObject.type === 'text' && newObject.width < newObject.textOpts!.fontSize
  return isTextWithLessThanThreshold ? existing : newObject
}

const useCanvasObjects = create<{
  // Objects
  canvasObjects: CanvasObject[]
  resetCanvasObjects: () => void
  reviveCanvasObjects: (_: CanvasObject[]) => void

  // Spesific object
  appendEraserObject: (_: Omit<EraserObject, 'type'>) => void
  appendPencilObject: (_: Omit<PencilObject, 'type'>) => void
  appendHighlighterObject: (_: Omit<HightlighterObject, 'type'>) => void

  appendCircleObject: (_: Omit<CircleObject, 'type'>) => void
  appendSquareObject: (_: Omit<SquareObject, 'type'>) => void
  appendTriangleObject: (_: Omit<TriangleObject, 'type'>) => void

  appendTextObject: (_: Omit<TextObject, 'type'>) => void
  appendIconObject: (_: Omit<IconObject, 'type'>) => void
  appendImageObject: (_: Omit<ImageObject, 'type'>) => void

  // Object
  updateCanvasObject: (_id: string, _obj: Partial<CanvasObject>) => void
  deleteCanvasObject: (_: string) => void
  moveCanvasObject: (_: {
    id: string
    deltaPosition: { deltaX: number; deltaY: number }
    canvasWorkingSize: CanvasWorkingSize
  }) => void
  resizeCanvasObject: (_: {
    id: string
    actionModeOption: ActionModeOption
    delta: { deltaX: number; deltaY: number }
    canvasWorkingSize: CanvasWorkingSize
  }) => void

  // Helper
  setObjectLayerIndex: (_id: string, _layerIndex: number) => void
  appendPointToCanvasObject: (
    _id: string,
    _point: { x: number; y: number }
  ) => void
}>((set) => ({
  canvasObjects: [],
  resetCanvasObjects: () => set(() => ({ canvasObjects: [] })),
  reviveCanvasObjects: (obj) => set(() => ({ canvasObjects: [...obj] })),

  appendEraserObject: (obj) =>
    set((state) => ({
      canvasObjects: [
        ...state.canvasObjects,
        {
          ...CANVAS_OBJECT_DEFAULT,
          type: 'eraser',
          id: generateUniqueId(),
          ...obj
        }
      ]
    })),
  appendPencilObject: (obj) =>
    set((state) => ({
      canvasObjects: [
        ...state.canvasObjects,
        {
          ...CANVAS_OBJECT_DEFAULT,
          type: 'pencil',
          id: generateUniqueId(),
          ...obj
        }
      ]
    })),
  appendHighlighterObject: (obj) =>
    set((state) => ({
      canvasObjects: [
        ...state.canvasObjects,
        {
          ...CANVAS_OBJECT_DEFAULT,
          type: 'highlighter',
          id: generateUniqueId(),
          ...obj
        }
      ]
    })),

  appendCircleObject: (obj) =>
    set((state) => ({
      canvasObjects: [
        ...state.canvasObjects,
        {
          ...CANVAS_OBJECT_DEFAULT,
          type: 'circle',
          id: generateUniqueId(),
          ...obj
        }
      ]
    })),
  appendSquareObject: (obj) =>
    set((state) => ({
      canvasObjects: [
        ...state.canvasObjects,
        {
          ...CANVAS_OBJECT_DEFAULT,
          type: 'square',
          id: generateUniqueId(),
          ...obj
        }
      ]
    })),
  appendTriangleObject: (obj) =>
    set((state) => ({
      canvasObjects: [
        ...state.canvasObjects,
        {
          ...CANVAS_OBJECT_DEFAULT,
          type: 'triangle',
          id: generateUniqueId(),
          ...obj
        }
      ]
    })),

  appendTextObject: (obj) =>
    set((state) => ({
      canvasObjects: [
        ...state.canvasObjects,
        {
          ...CANVAS_OBJECT_DEFAULT,
          type: 'text',
          id: generateUniqueId(),
          ...obj
        }
      ]
    })),
  appendIconObject: (obj) =>
    set((state) => ({
      canvasObjects: [
        ...state.canvasObjects,
        {
          ...CANVAS_OBJECT_DEFAULT,
          type: 'icon',
          id: generateUniqueId(),
          ...obj
        }
      ]
    })),
  appendImageObject: (obj) =>
    set((state) => ({
      canvasObjects: [
        ...state.canvasObjects,
        {
          ...CANVAS_OBJECT_DEFAULT,
          type: 'image',
          id: generateUniqueId(),
          ...obj
        }
      ]
    })),

  updateCanvasObject: (id, partialObject) =>
    set((state) => ({
      canvasObjects: state.canvasObjects.map((existing) =>
        existing.id === id
          ? curateObjectModifications(
              { ...existing, ...partialObject },
              existing
            )
          : existing
      )
    })),
  deleteCanvasObject: (id) =>
    set((state) => ({
      canvasObjects: state.canvasObjects.filter(
        (existing) => existing.id !== id
      )
    })),
  moveCanvasObject: ({ id, deltaPosition }) =>
    set((state) => ({
      canvasObjects: state.canvasObjects.map((existing) =>
        existing.id === id
          ? {
              ...existing,
              x: existing.x + deltaPosition.deltaX,
              y: existing.y + deltaPosition.deltaY
            }
          : existing
      )
    })),
  resizeCanvasObject: ({ id, actionModeOption, delta }) =>
    set((state) => ({
      canvasObjects: state.canvasObjects.map((existing) => {
        if (existing.id !== id) {
          return existing
        }
        let result: CanvasObject = existing
        switch (actionModeOption) {
          case 'topLeft': {
            result = {
              ...existing,
              x: existing.x + delta.deltaX,
              y: existing.y + delta.deltaY,
              width: existing.width - delta.deltaX,
              height: existing.height - delta.deltaY,
              points: existing.points
                ? existing.points.map((point) => {
                    const growthRatioX = delta.deltaX / existing.width
                    const growthRatioY = delta.deltaY / existing.height
                    return {
                      x: point.x - (point.x - existing.x) * growthRatioX,
                      y: point.y - (point.y - existing.y) * growthRatioY
                    }
                  })
                : undefined
            }
            break
          }
          case 'topCenter': {
            result = {
              ...existing,
              y: existing.y + delta.deltaY,
              height: existing.height - delta.deltaY,
              points: existing.points
                ? existing.points.map((point) => {
                    const growthRatioY = delta.deltaY / existing.height
                    return {
                      x: point.x,
                      y: point.y - (point.y - existing.y) * growthRatioY
                    }
                  })
                : undefined
            }
            break
          }
          case 'topRight': {
            result = {
              ...existing,
              width: existing.width + delta.deltaX,
              y: existing.y + delta.deltaY,
              height: existing.height - delta.deltaY,
              points: existing.points
                ? existing.points.map((point) => {
                    const growthRatioX = delta.deltaX / existing.width
                    const growthRatioY = delta.deltaY / existing.height
                    return {
                      x: point.x + (point.x - existing.x) * growthRatioX,
                      y: point.y - (point.y - existing.y) * growthRatioY
                    }
                  })
                : undefined
            }
            break
          }
          case 'middleLeft': {
            result = {
              ...existing,
              x: existing.x + delta.deltaX,
              width: existing.width - delta.deltaX,
              points: existing.points
                ? existing.points.map((point) => {
                    const growthRatioX = delta.deltaX / existing.width
                    return {
                      x: point.x - (point.x - existing.x) * growthRatioX,
                      y: point.y
                    }
                  })
                : undefined
            }
            break
          }
          case 'middleRight': {
            result = {
              ...existing,
              width: existing.width + delta.deltaX,
              points: existing.points
                ? existing.points.map((point) => {
                    const growthRatioX = delta.deltaX / existing.width
                    return {
                      x: point.x + (point.x - existing.x) * growthRatioX,
                      y: point.y
                    }
                  })
                : undefined
            }
            break
          }
          case 'bottomLeft': {
            result = {
              ...existing,
              x: existing.x + delta.deltaX,
              width: existing.width - delta.deltaX,
              height: existing.height + delta.deltaY,
              points: existing.points
                ? existing.points.map((point) => {
                    const growthRatioX = delta.deltaX / existing.width
                    const growthRatioY = delta.deltaY / existing.height
                    return {
                      x: point.x - (point.x - existing.x) * growthRatioX,
                      y: point.y + (point.y - existing.y) * growthRatioY
                    }
                  })
                : undefined
            }
            break
          }
          case 'bottomCenter': {
            result = {
              ...existing,
              height: existing.height + delta.deltaY,
              points: existing.points
                ? existing.points!.map((point) => {
                    const growthRatioY = delta.deltaY / existing.height
                    return {
                      x: point.x,
                      y: point.y + (point.y - existing.y) * growthRatioY
                    }
                  })
                : undefined
            }
            break
          }
          case 'bottomRight':
          default: {
            result = {
              ...existing,
              width: existing.width + delta.deltaX,
              height: existing.height + delta.deltaY,
              points: existing.points
                ? existing.points.map((point) => {
                    const growthRatioX = delta.deltaX / existing.width
                    const growthRatioY = delta.deltaY / existing.height
                    return {
                      x: point.x + (point.x - existing.x) * growthRatioX,
                      y: point.y + (point.y - existing.y) * growthRatioY
                    }
                  })
                : undefined
            }
            break
          }
        }
        return curateObjectModifications(result, existing)
      })
    })),

  setObjectLayerIndex: (id, layerIndex) =>
    set((state) => {
      if (layerIndex < 0 || layerIndex >= state.canvasObjects.length) {
        return state
      }
      return {
        canvasObjects: state.canvasObjects.map((existing, index) => {
          if (existing.id === id) {
            return state.canvasObjects[layerIndex]
          }
          if (index === layerIndex) {
            return state.canvasObjects.find((o) => o.id === id)!
          }
          return existing
        })
      }
    }),
  appendPointToCanvasObject(id, point) {
    set((state) => {
      const { x, y } = getPositionFromDrawingPoints({
        points: [
          ...(state.canvasObjects.find((o) => o.id === id)?.points || []),
          { x: point.x, y: point.y }
        ]
      })

      return {
        canvasObjects: state.canvasObjects.map((existing) =>
          existing.id === id
            ? {
                ...existing,
                x,
                y,
                points: [...(existing.points || []), point]
              }
            : existing
        )
      }
    })
  }
}))

export default useCanvasObjects

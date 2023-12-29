import { create } from 'zustand'

import { CANVAS_OBJECT_DEFAULT } from '../data/constants'
import type {
  ActionModeOption,
  CanvasObject,
  CanvasWorkingSize,
  FreeDrawObject,
  IconObject,
  ImageObject,
  ShapeObject,
  TextObject
} from '../data/types'
import generateUniqueId from '../utils/generateUniqueId'
import getPositionFromDrawingPoints from '../utils/getPositionFromDrawingPoints'

function curateObjectModifications(
  newObject: CanvasObject,
  existing: CanvasObject
) {
  const hasNegativeSize = newObject.width < 1 || newObject.height < 1
  if (hasNegativeSize) {
    return existing
  }
  const isTextWithLessThanThreshold =
    newObject.type === 'text' && newObject.width < newObject.fontSize
  return isTextWithLessThanThreshold ? existing : newObject
}

const useCanvasObjects = create<{
  canvasObjects: CanvasObject[]
  appendPencilObject: (_: Omit<FreeDrawObject, 'type'>) => void
  appendHighlighterObject: (_: Omit<FreeDrawObject, 'type'>) => void
  appendEraserObject: (_: Omit<FreeDrawObject, 'type'>) => void
  appendSquareObject: (_: Omit<ShapeObject, 'type'>) => void
  appendCircleObject: (_: Omit<ShapeObject, 'type'>) => void
  appendTriangleObject: (_: Omit<ShapeObject, 'type'>) => void
  appendTextObject: (_: Omit<TextObject, 'type'>) => void
  appendIconObject: (_: Omit<IconObject, 'type'>) => void
  appendImageObject: (_: Omit<ImageObject, 'type'>) => void
  updateCanvasObject: (_id: string, _obj: Partial<CanvasObject>) => void
  appendFreeDrawPointToCanvasObject: (
    _id: string,
    _point: { x: number; y: number }
  ) => void
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
  setCanvasObjectLayerIndex: (_id: string, _layerIndex: number) => void
  resetCanvasObjects: () => void
}>((set) => ({
  canvasObjects: [],
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
  appendFreeDrawPointToCanvasObject(id, point) {
    set((state) => {
      const { x, y } = getPositionFromDrawingPoints({
        freeDrawPoints: [
          ...(state.canvasObjects.find((o) => o.id === id)?.freeDrawPoints ||
            []),
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
                freeDrawPoints: [...existing.freeDrawPoints, point]
              }
            : existing
        )
      }
    })
  },
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
              freeDrawPoints: existing.freeDrawPoints.map((point) => {
                const growthRatioX = delta.deltaX / existing.width
                const growthRatioY = delta.deltaY / existing.height
                return {
                  x: point.x - (point.x - existing.x) * growthRatioX,
                  y: point.y - (point.y - existing.y) * growthRatioY
                }
              })
            }
            break
          }
          case 'topCenter': {
            result = {
              ...existing,
              y: existing.y + delta.deltaY,
              height: existing.height - delta.deltaY,
              freeDrawPoints: existing.freeDrawPoints.map((point) => {
                const growthRatioY = delta.deltaY / existing.height
                return {
                  x: point.x,
                  y: point.y - (point.y - existing.y) * growthRatioY
                }
              })
            }
            break
          }
          case 'topRight': {
            result = {
              ...existing,
              width: existing.width + delta.deltaX,
              y: existing.y + delta.deltaY,
              height: existing.height - delta.deltaY,
              freeDrawPoints: existing.freeDrawPoints.map((point) => {
                const growthRatioX = delta.deltaX / existing.width
                const growthRatioY = delta.deltaY / existing.height
                return {
                  x: point.x + (point.x - existing.x) * growthRatioX,
                  y: point.y - (point.y - existing.y) * growthRatioY
                }
              })
            }
            break
          }
          case 'middleLeft': {
            result = {
              ...existing,
              x: existing.x + delta.deltaX,
              width: existing.width - delta.deltaX,
              freeDrawPoints: existing.freeDrawPoints.map((point) => {
                const growthRatioX = delta.deltaX / existing.width
                return {
                  x: point.x - (point.x - existing.x) * growthRatioX,
                  y: point.y
                }
              })
            }
            break
          }
          case 'middleRight': {
            result = {
              ...existing,
              width: existing.width + delta.deltaX,
              freeDrawPoints: existing.freeDrawPoints.map((point) => {
                const growthRatioX = delta.deltaX / existing.width
                return {
                  x: point.x + (point.x - existing.x) * growthRatioX,
                  y: point.y
                }
              })
            }
            break
          }
          case 'bottomLeft': {
            result = {
              ...existing,
              x: existing.x + delta.deltaX,
              width: existing.width - delta.deltaX,
              height: existing.height + delta.deltaY,
              freeDrawPoints: existing.freeDrawPoints.map((point) => {
                const growthRatioX = delta.deltaX / existing.width
                const growthRatioY = delta.deltaY / existing.height
                return {
                  x: point.x - (point.x - existing.x) * growthRatioX,
                  y: point.y + (point.y - existing.y) * growthRatioY
                }
              })
            }
            break
          }
          case 'bottomCenter': {
            result = {
              ...existing,
              height: existing.height + delta.deltaY,
              freeDrawPoints: existing.freeDrawPoints.map((point) => {
                const growthRatioY = delta.deltaY / existing.height
                return {
                  x: point.x,
                  y: point.y + (point.y - existing.y) * growthRatioY
                }
              })
            }
            break
          }
          case 'bottomRight':
          default: {
            result = {
              ...existing,
              width: existing.width + delta.deltaX,
              height: existing.height + delta.deltaY,
              freeDrawPoints: existing.freeDrawPoints.map((point) => {
                const growthRatioX = delta.deltaX / existing.width
                const growthRatioY = delta.deltaY / existing.height
                return {
                  x: point.x + (point.x - existing.x) * growthRatioX,
                  y: point.y + (point.y - existing.y) * growthRatioY
                }
              })
            }
            break
          }
        }
        return curateObjectModifications(result, existing)
      })
    })),
  setCanvasObjectLayerIndex: (id, layerIndex) =>
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
  resetCanvasObjects: () => set(() => ({ canvasObjects: [] }))
}))

export default useCanvasObjects

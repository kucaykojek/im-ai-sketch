import {
  Ellipse,
  FabricObject,
  Rect,
  TPointerEvent,
  Textbox,
  Triangle
} from 'fabric'
import { omit } from 'lodash'

import { TEXT_OPTIONS_DEFAULT } from './data/constants'
import useEllipseOptions from './store/object/useEllipseOptions'
import useRectOptions from './store/object/useRectOptions'
import useTextOptions from './store/object/useTextOptions'
import useTriangleOptions from './store/object/useTriangleOptions'
import useCanvas from './store/useCanvas'

let obj: FabricObject
let isDrawing = false
let initPosition = { x: 0, y: 0 }

const useSketchDrawHandler = () => {
  const { canvas, activeTool, setActiveTool } = useCanvas()
  const { options: ellipseOptions } = useEllipseOptions()
  const { options: rectOptions } = useRectOptions()
  const { options: triangleOptions } = useTriangleOptions()
  const { options: textOptions } = useTextOptions()

  const setSelectable = (selectable: boolean) => {
    if (canvas) {
      canvas.getObjects().forEach((obj) => obj.set({ selectable }))
    }
  }

  const startDrawing = (e: TPointerEvent) => {
    if (!canvas) {
      return
    }

    if (!!canvas.getActiveObject()) {
      return
    }

    isDrawing = true
    const pointer = canvas.getViewportPoint(e)

    initPosition = { x: pointer.x, y: pointer.y }

    const commonInitOptions = {
      left: pointer.x,
      top: pointer.y,
      width: 1,
      height: 1
    }

    switch (activeTool) {
      case 'ellipse':
        obj = new Ellipse({
          ...commonInitOptions,
          ...ellipseOptions,
          rx: 1,
          ry: 1
        })
        break
      case 'rect':
        obj = new Rect({
          ...commonInitOptions,
          ...rectOptions
        })
        break
      case 'triangle':
        obj = new Triangle({
          ...commonInitOptions,
          ...triangleOptions
        })
        break
      case 'textbox':
        obj = new Textbox(textOptions.text || TEXT_OPTIONS_DEFAULT.text || '', {
          ...commonInitOptions,
          ...omit(textOptions, ['textbox'])
        })
        break

      default:
        break
    }

    if (obj) {
      canvas.add(obj)
      canvas.renderAll()
      canvas.setActiveObject(obj)
    }
  }

  const updateDrawing = (e: TPointerEvent) => {
    if (!isDrawing || !activeTool || !canvas || !canvas!.getActiveObject()) {
      return
    }

    const pointer = canvas.getViewportPoint(e)
    let obj = canvas.getActiveObject()

    if (!obj) {
      return
    }

    const width = Math.abs(pointer.x - initPosition.x)
    const height = Math.abs(pointer.y - initPosition.y)

    switch (activeTool) {
      case 'ellipse':
        if (initPosition.x > pointer.x) {
          obj.set({ left: Math.abs(pointer.x) })
        }

        if (initPosition.y > pointer.y) {
          obj.set({ top: Math.abs(pointer.y) })
        }

        obj.set({ width })
        obj.set({ height })
        ;(obj as Ellipse).set({
          rx: width / 2,
          ry: height / 2
        })
        break
      case 'rect':
      case 'triangle':
        if (initPosition.x > pointer.x) {
          obj.set({ left: Math.abs(pointer.x) })
        }

        if (initPosition.y > pointer.y) {
          obj.set({ top: Math.abs(pointer.y) })
        }

        obj.set({ width })
        obj.set({ height })
        break
      case 'textbox':
        if (initPosition.x > pointer.x) {
          obj.set({ left: Math.abs(pointer.x) })
        }

        if (initPosition.y > pointer.y) {
          obj.set({ top: Math.abs(pointer.y) })
        }
        break

      default:
        break
    }

    if (obj) {
      canvas.renderAll()
    }
  }

  const stopDrawing = () => {
    if (!canvas) {
      return
    }

    isDrawing = false
    setActiveTool(null)
  }

  return { startDrawing, updateDrawing, stopDrawing, setSelectable }
}

export default useSketchDrawHandler

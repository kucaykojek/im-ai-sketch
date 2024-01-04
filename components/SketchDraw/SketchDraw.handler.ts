import { fabric } from 'fabric'
import { omit } from 'lodash'

import { TEXT_OPTIONS_DEFAULT } from './data/constants'
import useCircleOptions from './store/object/useCircleOptions'
import useRectangleOptions from './store/object/useRectangleOptions'
import useTextOptions from './store/object/useTextOptions'
import useTriangleOptions from './store/object/useTriangleOptions'
import useCanvas from './store/useCanvas'
import { generateUniqueId } from './utils/common'

let obj: fabric.Object
let isDrawing = false
let initPosition = { x: 0, y: 0 }

const useSketchDrawHandler = () => {
  const { canvas, activeTool, setActiveTool } = useCanvas()
  const { options: circleOptions } = useCircleOptions()
  const { options: rectangleOptions } = useRectangleOptions()
  const { options: triangleOptions } = useTriangleOptions()
  const { options: textOptions } = useTextOptions()

  const startDrawing = (e: fabric.IEvent) => {
    if (!canvas) {
      return
    }

    if (!!canvas.getActiveObject()) {
      return
    }

    isDrawing = true
    const pointer = canvas.getPointer(e as unknown as Event)

    initPosition = { x: pointer.x, y: pointer.y }

    const commonInitOptions = {
      left: pointer.x,
      top: pointer.y,
      width: 1,
      height: 1
    }

    switch (activeTool) {
      case 'circle':
        obj = new fabric.Ellipse({
          ...commonInitOptions,
          ...circleOptions,
          rx: 1,
          ry: 1,
          type: 'circle',
          name: generateUniqueId()
        })
        break
      case 'rectangle':
        obj = new fabric.Rect({
          ...commonInitOptions,
          ...rectangleOptions,
          type: 'rectangle',
          name: generateUniqueId()
        })
        break
      case 'triangle':
        obj = new fabric.Triangle({
          ...commonInitOptions,
          ...triangleOptions,
          type: 'triangle',
          name: generateUniqueId()
        })
        break
      case 'text':
        obj = new fabric.Textbox(
          textOptions.text || TEXT_OPTIONS_DEFAULT.text || '',
          {
            ...commonInitOptions,
            ...omit(textOptions, ['text']),
            type: 'text',
            name: generateUniqueId()
          }
        )
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

  const updateDrawing = (e: fabric.IEvent) => {
    if (!isDrawing || !activeTool || !canvas || !canvas!.getActiveObject()) {
      return
    }

    const pointer = canvas.getPointer(e as unknown as Event)
    let obj = canvas.getActiveObject()

    if (!obj) {
      return
    }

    const width = Math.abs(pointer.x - initPosition.x)
    const height = Math.abs(pointer.y - initPosition.y)

    switch (activeTool) {
      case 'circle':
        if (initPosition.x > pointer.x) {
          obj.set({ left: Math.abs(pointer.x) })
        }

        if (initPosition.y > pointer.y) {
          obj.set({ top: Math.abs(pointer.y) })
        }

        obj.set({ width })
        obj.set({ height })
        ;(obj as fabric.Ellipse).set({
          rx: width / 2,
          ry: height / 2
        })
        break
      case 'rectangle':
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
      case 'text':
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

  return { startDrawing, updateDrawing, stopDrawing }
}

export default useSketchDrawHandler

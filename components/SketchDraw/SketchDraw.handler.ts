import {
  Ellipse,
  FabricObject,
  PencilBrush,
  Rect,
  Textbox,
  Triangle
} from 'fabric'
import { omit } from 'lodash'

import { SELECTION_OPTIONS, TEXT_OPTIONS_DEFAULT } from './data/constants'
import useSketchDrawStore from './store/SketchDraw.store'
import useSketchDrawToolsOptionsStore from './store/options'
import { saveCanvasToStorage } from './utils/canvas'

let obj: FabricObject
let isCreating = false
let initPosition = { x: 0, y: 0 }

const useSketchDrawHandler = () => {
  const {
    canvas,
    canvasOptions,
    history,
    historyStates,
    activeTool,
    setActiveTool,
    pushHistoryState,
    popHistoryState,
    setSelectedObjects
  } = useSketchDrawStore()
  const toolsOptions = useSketchDrawToolsOptionsStore()

  // BEGIN: creating/drawing object related
  const setSelectable = (selectable: boolean) => {
    if (canvas) {
      canvas.getObjects().forEach((obj) => obj.set({ selectable }))
    }
  }

  const startCreating = (e: any) => {
    if (!canvas) {
      return
    }

    if (!!canvas.getActiveObject()) {
      return
    }

    isCreating = true
    const pointer = canvas.getScenePoint(e)

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
          ...toolsOptions.Ellipse.options,
          rx: 1,
          ry: 1
        })
        break
      case 'rect':
        obj = new Rect({
          ...commonInitOptions,
          ...toolsOptions.Rect.options
        })
        break
      case 'triangle':
        obj = new Triangle({
          ...commonInitOptions,
          ...toolsOptions.Triangle.options
        })
        break
      case 'textbox':
        obj = new Textbox(
          toolsOptions.Text.options.text || TEXT_OPTIONS_DEFAULT.text || '',
          {
            ...commonInitOptions,
            ...omit(toolsOptions.Text.options, ['textbox'])
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

  const processCreating = (e: any) => {
    if (!isCreating || !activeTool || !canvas || !canvas!.getActiveObject()) {
      return
    }

    const pointer = canvas.getScenePoint(e)
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
      canvas.requestRenderAll()
    }
  }

  const stopCreating = () => {
    if (!canvas) {
      return
    }

    isCreating = false
    setActiveTool(null)
    setSelectable(true)

    creatingStopListen()
  }

  const creatingStartListen = () => {
    if (canvas) {
      canvas.on('mouse:down', startCreating)
      canvas.on('mouse:move', processCreating)
      canvas.on('mouse:up', stopCreating)
    }
  }

  const creatingStopListen = () => {
    if (canvas) {
      canvas.off('mouse:down', startCreating)
      canvas.off('mouse:move', processCreating)
      canvas.off('mouse:up', stopCreating)
    }
  }

  const setPencilDrawing = () => {
    if (canvas) {
      canvas.freeDrawingBrush = new PencilBrush(canvas)
      canvas.freeDrawingBrush.color = toolsOptions.Pencil.options.color
      canvas.freeDrawingBrush.width = toolsOptions.Pencil.options.width
      canvas.freeDrawingBrush.strokeLineCap =
        toolsOptions.Pencil.options.strokeLineCap
      canvas.freeDrawingBrush.strokeLineJoin =
        toolsOptions.Pencil.options.strokeLineJoin
    }
  }

  const setEraserDrawing = () => {
    if (canvas) {
      canvas.freeDrawingBrush = new PencilBrush(canvas)
      canvas.freeDrawingBrush.color = canvasOptions.backgroundColor as string
      canvas.freeDrawingBrush.width = toolsOptions.Eraser.options.width
      canvas.freeDrawingBrush.strokeLineCap =
        toolsOptions.Eraser.options.strokeLineCap
      canvas.freeDrawingBrush.strokeLineJoin =
        toolsOptions.Eraser.options.strokeLineJoin
    }
  }

  const setHighlighterDrawing = () => {
    if (canvas) {
      canvas.freeDrawingBrush = new PencilBrush(canvas)
      canvas.freeDrawingBrush.color = toolsOptions.Highlighter.options.color
      canvas.freeDrawingBrush.width = toolsOptions.Highlighter.options.width
      canvas.freeDrawingBrush.strokeLineCap =
        toolsOptions.Highlighter.options.strokeLineCap
      canvas.freeDrawingBrush.strokeLineJoin =
        toolsOptions.Highlighter.options.strokeLineJoin
    }
  }
  // END: creating/drawing object related

  // BEGIN: selection related
  const objectSelection = (e: any) => {
    if (canvas) {
      setSelectedObjects(e.selected || [])
      saveCanvasToStorage(canvas)
    }
  }

  const objectAdded = (e: any) => {
    if (canvas) {
      // Set selection object properties
      e.target.set({ ...SELECTION_OPTIONS })

      objectSelection(e)
    }
  }

  const selectionStartListen = () => {
    if (canvas) {
      canvas.on('selection:created', objectSelection)
      canvas.on('selection:updated', objectSelection)
      canvas.on('selection:cleared', objectSelection)
      canvas.on('object:added', objectAdded)
    }
  }

  const selectionStopListen = () => {
    if (canvas) {
      canvas.off('selection:created', objectSelection)
      canvas.off('selection:updated', objectSelection)
      canvas.off('selection:cleared', objectSelection)
      canvas.off('object:added', objectAdded)
    }
  }
  // END: selection related

  // BEGIN: history related
  const historyCreate = () => {
    if (canvas && history) {
      const newState = canvas.toDatalessJSON()
      pushHistoryState(newState)

      history.add({
        undo: () => {
          popHistoryState()
          historyToCanvas()
        },
        redo: () => {
          pushHistoryState(newState)
          historyToCanvas()
        }
      })
    }
  }

  const historyStartListen = () => {
    if (canvas) {
      canvas.on('object:added', historyCreate)
      canvas.on('object:removed', historyCreate)
      canvas.on('object:modified', historyCreate)
    }
  }

  const historyStopListen = () => {
    if (canvas) {
      canvas.off('object:added', historyCreate)
      canvas.off('object:removed', historyCreate)
      canvas.off('object:modified', historyCreate)
    }
  }

  const historyToCanvas = async () => {
    if (canvas && historyStates.length > 0) {
      historyStopListen()
      ;(
        await canvas.loadFromJSON(historyStates[historyStates.length - 1])
      ).requestRenderAll()
      historyStartListen()
    }
  }
  // END: history related

  return {
    startCreating,
    processCreating,
    stopCreating,
    creatingStartListen,
    creatingStopListen,
    setSelectable,
    setPencilDrawing,
    setEraserDrawing,
    setHighlighterDrawing,
    historyCreate,
    historyToCanvas,
    historyStartListen,
    historyStopListen,
    objectSelection,
    objectAdded,
    selectionStartListen,
    selectionStopListen
  }
}

export default useSketchDrawHandler

import { PencilBrush } from 'fabric'
import { useEffect } from 'react'

import useSketchDrawHandler from './SketchDraw.handler'
import { SELECTION_OPTIONS } from './data/constants'
import useSketchDrawStore from './store/SketchDraw.store'
import useSketchDrawToolsOptionsStore from './store/options'
import { saveCanvasToStorage } from './utils/canvas'

type Props = {
  initCanvas: () => void
}

const SketchDrawListener = ({ initCanvas }: Props) => {
  const {
    activeTool,
    containerRef,
    canvas,
    canvasOptions,
    history,
    setSelectedObjects,
    setContainerSize
  } = useSketchDrawStore()
  const { startDrawing, updateDrawing, stopDrawing, setSelectable } =
    useSketchDrawHandler()
  const toolsOptions = useSketchDrawToolsOptionsStore()

  // BEGIN: window/document events
  useEffect(() => {
    if (!containerRef.current) {
      return
    }

    setContainerSize({
      width: containerRef.current.offsetWidth,
      height: containerRef.current.offsetHeight
    })
  }, [containerRef, setContainerSize])

  useEffect(() => {
    const onResize = () => {
      if (containerRef.current) {
        setContainerSize({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight
        })
      }
      initCanvas()
    }

    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [containerRef, setContainerSize, initCanvas])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (!canvas) {
        return
      }

      const isInputFocused = ['input', 'textarea'].includes(
        document.activeElement?.localName || ''
      )
      const deleteKeys: KeyboardEvent['key'][] = ['Backspace', 'Delete']

      // Delete keys
      if (
        deleteKeys.includes(event.key) &&
        !isInputFocused &&
        canvas.getActiveObjects().length > 0
      ) {
        canvas.getActiveObjects().forEach((obj) => canvas.remove(obj))
        canvas.discardActiveObject()
        canvas.requestRenderAll()
      }

      // Undo: Ctrl+Z / Redo: Ctrl+Shift+Z
      if (
        event.code === 'KeyZ' &&
        (event.ctrlKey || event.metaKey) &&
        event.shiftKey &&
        history?.canRedo()
      ) {
        history?.redo()
      } else if (
        event.code === 'KeyZ' &&
        (event.ctrlKey || event.metaKey) &&
        history?.canUndo()
      ) {
        history?.undo()
      }
    }

    window.addEventListener('keydown', onKeyDown)

    return () => {
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [canvas, history])
  // END: window/document events

  useEffect(() => {
    if (canvas) {
      if (
        ['ellipse', 'rect', 'triangle', 'textbox'].includes(activeTool || '')
      ) {
        setSelectable(false)

        const canvasMouseDown = (e: any) => {
          startDrawing(e)
        }

        const canvasMouseMove = (e: any) => {
          updateDrawing(e)
        }

        const canvasMouseUp = () => {
          stopDrawing()
          setSelectable(true)

          canvas.off('mouse:down', canvasMouseDown)
          canvas.off('mouse:move', canvasMouseMove)
          canvas.off('mouse:up', canvasMouseUp)
        }

        canvas.on('mouse:down', canvasMouseDown)
        canvas.on('mouse:move', canvasMouseMove)
        canvas.on('mouse:up', canvasMouseUp)

        return () => {
          canvas.off('mouse:down', canvasMouseDown)
          canvas.off('mouse:move', canvasMouseMove)
          canvas.off('mouse:up', canvasMouseUp)
        }
      } else if (
        ['pencil', 'eraser', 'highlighter'].includes(activeTool || '')
      ) {
        canvas.isDrawingMode = true

        switch (activeTool) {
          case 'pencil':
            canvas.freeDrawingBrush = new PencilBrush(canvas)
            canvas.freeDrawingBrush.color = toolsOptions.Pencil.options.color
            canvas.freeDrawingBrush.width = toolsOptions.Pencil.options.width
            canvas.freeDrawingBrush.strokeLineCap =
              toolsOptions.Pencil.options.strokeLineCap
            canvas.freeDrawingBrush.strokeLineJoin =
              toolsOptions.Pencil.options.strokeLineJoin
            break
          case 'eraser':
            canvas.freeDrawingBrush = new PencilBrush(canvas)
            canvas.freeDrawingBrush.color =
              canvasOptions.backgroundColor as string
            canvas.freeDrawingBrush.width = toolsOptions.Eraser.options.width
            canvas.freeDrawingBrush.strokeLineCap =
              toolsOptions.Eraser.options.strokeLineCap
            canvas.freeDrawingBrush.strokeLineJoin =
              toolsOptions.Eraser.options.strokeLineJoin
            break
          case 'highlighter':
            canvas.freeDrawingBrush = new PencilBrush(canvas)
            canvas.freeDrawingBrush.color =
              toolsOptions.Highlighter.options.color
            canvas.freeDrawingBrush.width =
              toolsOptions.Highlighter.options.width
            canvas.freeDrawingBrush.strokeLineCap =
              toolsOptions.Highlighter.options.strokeLineCap
            canvas.freeDrawingBrush.strokeLineJoin =
              toolsOptions.Highlighter.options.strokeLineJoin
            break
        }
      } else {
        canvas.isDrawingMode = false
      }
    }
  }, [
    canvas,
    activeTool,
    toolsOptions.Pencil.options,
    toolsOptions.Highlighter.options,
    toolsOptions.Ellipse.options,
    toolsOptions.Rect.options,
    toolsOptions.Triangle.options
  ])

  useEffect(() => {
    if (canvas) {
      const canvasObjectSelection = (e: any) => {
        setSelectedObjects(e.selected || [])
        saveCanvasToStorage(canvas)
      }

      const canvasSelectionCreated = (e: any) => {
        canvasObjectSelection(e)
      }

      const canvasSelectionUpdated = (e: any) => {
        canvasObjectSelection(e)
      }

      const canvasSelectionCleared = (e: any) => {
        canvasObjectSelection(e)
      }

      const canvasObjectAdded = (e: any) => {
        e.target.set({ ...SELECTION_OPTIONS })
        canvasObjectSelection(e)
      }

      canvas.on('selection:created', canvasSelectionCreated)
      canvas.on('selection:updated', canvasSelectionUpdated)
      canvas.on('selection:cleared', canvasSelectionCleared)
      canvas.on('object:added', canvasObjectAdded)

      return () => {
        canvas.off('selection:created', canvasSelectionCreated)
        canvas.off('selection:updated', canvasSelectionUpdated)
        canvas.off('selection:cleared', canvasSelectionCleared)
        canvas.off('object:added', canvasObjectAdded)
      }
    }
  }, [canvas])

  return null
}

export default SketchDrawListener

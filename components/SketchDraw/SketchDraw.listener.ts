import { useEffect } from 'react'

import useSketchDrawHandler from './SketchDraw.handler'
import { SELECTION_OPTIONS } from './data/constants'
import useSketchDrawStore from './store/SketchDraw.store'
import useSketchDrawToolsOptionsStore from './store/options'

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
    setContainerSize
  } = useSketchDrawStore()

  const {
    creatingStartListen,
    creatingStopListen,
    setSelectable,
    setPencilDrawing,
    setEraserDrawing,
    setHighlighterDrawing,
    historyStartListen,
    historyStopListen,
    selectionStartListen,
    selectionStopListen
  } = useSketchDrawHandler()

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
        !event.shiftKey &&
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

  // Listen for drawing objects
  useEffect(() => {
    if (canvas) {
      if (
        ['ellipse', 'rect', 'triangle', 'textbox'].includes(activeTool || '')
      ) {
        setSelectable(false)
        creatingStartListen()

        return () => {
          creatingStopListen()
        }
      } else if (
        ['pencil', 'eraser', 'highlighter'].includes(activeTool || '')
      ) {
        canvas.isDrawingMode = true

        switch (activeTool) {
          case 'pencil':
            setPencilDrawing()
            break
          case 'eraser':
            setEraserDrawing()
            break
          case 'highlighter':
            setHighlighterDrawing()
            break
        }
      } else {
        canvas.isDrawingMode = false
      }
    }
  }, [
    canvas,
    activeTool,
    canvasOptions.backgroundColor,
    toolsOptions.Pencil.options,
    toolsOptions.Highlighter.options,
    toolsOptions.Eraser.options,
    toolsOptions.Ellipse.options,
    toolsOptions.Rect.options,
    toolsOptions.Triangle.options
  ])

  // Listen for object selections
  useEffect(() => {
    if (canvas) {
      canvas.getActiveSelection().borderColor = SELECTION_OPTIONS.borderColor
      canvas.getActiveSelection().cornerColor = SELECTION_OPTIONS.cornerColor
      canvas.getActiveSelection().cornerStyle = SELECTION_OPTIONS.cornerStyle
      canvas.getActiveSelection().transparentCorners =
        SELECTION_OPTIONS.transparentCorners

      selectionStartListen()

      return () => {
        selectionStopListen()
      }
    }
  }, [canvas])

  // Listen for history
  useEffect(() => {
    if (canvas && history) {
      historyStartListen()

      return () => {
        historyStopListen()
      }
    }
  }, [canvas, history])

  return null
}

export default SketchDrawListener

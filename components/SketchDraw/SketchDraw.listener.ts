import { PencilBrush } from 'fabric'
import { useEffect } from 'react'

import useSketchDrawContext from './SketchDraw.context'
import useSketchDrawHandler from './SketchDraw.handler'
import { SELECTION_OPTIONS } from './data/constants'
import useEllipseOptions from './store/object/useEllipseOptions'
import useEraserOptions from './store/object/useEraserOptions'
import useHighlighterOptions from './store/object/useHighlighterOptions'
import usePencilOptions from './store/object/usePencilOptions'
import useRectOptions from './store/object/useRectOptions'
import useTriangleOptions from './store/object/useTriangleOptions'
import useCanvas from './store/useCanvas'
import useContainerSize from './store/useContainerSize'
import { saveObjectsToStorage } from './utils/object'

export default function SketchDrawListener() {
  const { containerRef, initCanvas, canvas } = useSketchDrawContext()
  const { activeTool, canvasOptions, setSelectedObjects } = useCanvas()
  const { startDrawing, updateDrawing, stopDrawing, setSelectable } =
    useSketchDrawHandler()
  const { setContainerSize } = useContainerSize()
  const { options: pencilOptions } = usePencilOptions()
  const { options: eraserOptions } = useEraserOptions()
  const { options: highlighterOptions } = useHighlighterOptions()
  const { options: ellipseOptions } = useEllipseOptions()
  const { options: rectOptions } = useRectOptions()
  const { options: triangleOptions } = useTriangleOptions()

  // BEGIN: window/document events
  useEffect(() => {
    if (!containerRef.current) {
      return
    }

    setContainerSize({
      width: containerRef.current.offsetWidth,
      height: containerRef.current.offsetHeight
    })
  }, [setContainerSize])

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
  }, [setContainerSize, initCanvas])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const isInputFocused = ['input', 'textarea'].includes(
        document.activeElement?.localName || ''
      )
      const deleteKeys: KeyboardEvent['key'][] = ['Backspace', 'Delete']

      if (
        !!canvas &&
        deleteKeys.includes(event.key) &&
        !isInputFocused &&
        canvas.getActiveObjects().length > 0
      ) {
        canvas.getActiveObjects().forEach((obj) => canvas.remove(obj))
        canvas.discardActiveObject()
        canvas.requestRenderAll()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [canvas])

  useEffect(() => {
    const onBeforeUnload = () => {
      return confirm('Are you sure?')
    }

    window.addEventListener('onbeforeunload', onBeforeUnload)
    return () => {
      window.removeEventListener('onbeforeunload', onBeforeUnload)
    }
  }, [])
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
            canvas.freeDrawingBrush.color = pencilOptions.color
            canvas.freeDrawingBrush.width = pencilOptions.width
            canvas.freeDrawingBrush.strokeLineCap = pencilOptions.strokeLineCap
            canvas.freeDrawingBrush.strokeLineJoin =
              pencilOptions.strokeLineJoin
            break
          case 'eraser':
            canvas.freeDrawingBrush = new PencilBrush(canvas)
            canvas.freeDrawingBrush.color =
              canvasOptions.backgroundColor as string
            canvas.freeDrawingBrush.width = eraserOptions.width
            canvas.freeDrawingBrush.strokeLineCap = eraserOptions.strokeLineCap
            canvas.freeDrawingBrush.strokeLineJoin =
              eraserOptions.strokeLineJoin
            break
          case 'highlighter':
            canvas.freeDrawingBrush = new PencilBrush(canvas)
            canvas.freeDrawingBrush.color = highlighterOptions.color
            canvas.freeDrawingBrush.width = highlighterOptions.width
            canvas.freeDrawingBrush.strokeLineCap =
              highlighterOptions.strokeLineCap
            canvas.freeDrawingBrush.strokeLineJoin =
              highlighterOptions.strokeLineJoin
            break
        }
      } else {
        canvas.isDrawingMode = false
      }
    }
  }, [
    canvas,
    activeTool,
    pencilOptions,
    highlighterOptions,
    ellipseOptions,
    rectOptions,
    triangleOptions
  ])

  useEffect(() => {
    if (canvas) {
      const canvasObjectSelection = (e: any) => {
        if (canvas) {
          setSelectedObjects(e.selected || [])
          saveObjectsToStorage(canvas.getObjects())
        }
      }

      const canvasObjectAdded = (e: any) => {
        if (canvas) {
          e.target.set({ ...SELECTION_OPTIONS })
          canvasObjectSelection(e)
        }
      }

      canvas.on('selection:created', canvasObjectSelection)
      canvas.on('selection:updated', canvasObjectSelection)
      canvas.on('selection:cleared', canvasObjectSelection)
      canvas.on('object:added', canvasObjectAdded)

      return () => {
        canvas.off('selection:created', canvasObjectSelection)
        canvas.off('selection:updated', canvasObjectSelection)
        canvas.off('selection:cleared', canvasObjectSelection)
        canvas.off('object:added', canvasObjectAdded)
      }
    }
  }, [canvas])

  return null
}

import { fabric } from 'fabric'
import { useEffect } from 'react'

import useSketchDrawContext from './SketchDraw.context'
import useSketchDrawHandler from './SketchDraw.handler'
import useCircleOptions from './store/object/useCircleOptions'
import useHighlighterOptions from './store/object/useHighlighterOptions'
import usePencilOptions from './store/object/usePencilOptions'
import useRectangleOptions from './store/object/useRectangleOptions'
import useTriangleOptions from './store/object/useTriangleOptions'
import useCanvas from './store/useCanvas'
import useContainerSize from './store/useContainerSize'

export default function SketchDrawListener() {
  const { containerRef, initCanvas, canvas } = useSketchDrawContext()
  const { activeTool, setCanvasOptions, setSelectedObjects } = useCanvas()
  const { startDrawing, updateDrawing, stopDrawing } = useSketchDrawHandler()
  const { setContainerSize } = useContainerSize()
  const { options: pencilOptions } = usePencilOptions()
  const { options: highlighterOptions } = useHighlighterOptions()
  const { options: circleOptions } = useCircleOptions()
  const { options: rectangleOptions } = useRectangleOptions()
  const { options: triangleOptions } = useTriangleOptions()

  // BEGIN: window/document events
  useEffect(() => {
    if (containerRef.current) {
      setContainerSize({
        width: containerRef.current.offsetWidth,
        height: containerRef.current.offsetHeight
      })
      setCanvasOptions({
        width: containerRef.current.offsetWidth as number,
        height: containerRef.current.offsetHeight as number
      })
    }
  }, [setContainerSize])

  useEffect(() => {
    const onResize = () => {
      if (containerRef.current) {
        setContainerSize({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight
        })
        setCanvasOptions({
          width: containerRef.current.offsetWidth as number,
          height: containerRef.current.offsetHeight as number
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
        ['circle', 'rectangle', 'triangle', 'text'].includes(activeTool || '')
      ) {
        const canvasMouseDown = (e: fabric.IEvent) => {
          startDrawing(e)
        }

        const canvasMouseMove = (e: fabric.IEvent) => {
          updateDrawing(e)
        }

        const canvasMouseUp = () => {
          stopDrawing()

          if (canvas) {
            canvas.off('mouse:down').off('mouse:move').off('mouse:up')
          }
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
        ['pencil', 'spray', 'highlighter'].includes(activeTool || '')
      ) {
        canvas.isDrawingMode = true

        switch (activeTool) {
          case 'pencil':
            canvas.freeDrawingBrush = new fabric.PencilBrush(canvas)
            canvas.freeDrawingBrush.color = pencilOptions.color
            canvas.freeDrawingBrush.width = pencilOptions.width
            canvas.freeDrawingBrush.strokeLineCap = pencilOptions.strokeLineCap
            canvas.freeDrawingBrush.strokeLineJoin =
              pencilOptions.strokeLineJoin
            break
          case 'highlighter':
            canvas.freeDrawingBrush = new fabric.PencilBrush(canvas)
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
    circleOptions,
    rectangleOptions,
    triangleOptions
  ])

  useEffect(() => {
    if (canvas) {
      const canvasObjectSelection = (e: fabric.IEvent) => {
        if (canvas) {
          setSelectedObjects(e.selected || [])
        }
      }

      canvas.on('selection:created', canvasObjectSelection)
      canvas.on('selection:updated', canvasObjectSelection)
      canvas.on('selection:cleared', canvasObjectSelection)

      return () => {
        canvas.off('selection:created', canvasObjectSelection)
        canvas.off('selection:updated', canvasObjectSelection)
        canvas.off('selection:cleared', canvasObjectSelection)
      }
    }
  }, [canvas])

  return null
}

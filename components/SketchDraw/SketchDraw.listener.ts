import { fabric } from 'fabric'
import { useEffect } from 'react'

import useSketchDrawContext from './SketchDraw.context'
import useSketchDrawHandler from './SketchDraw.handler'
import useCanvas from './store/useCanvas'
import useContainerSize from './store/useContainerSize'

export default function SketchDrawListener() {
  const { containerRef, initCanvas, canvas } = useSketchDrawContext()
  const { activeTool, setCanvasOptions, setActiveObject } = useCanvas()
  const { initDraw } = useSketchDrawHandler()

  const { setContainerSize } = useContainerSize()

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
  // END: window/document events

  // BEGIN: canvas events
  const canvasMouseDown = (e: fabric.IEvent) => {
    console.log('canvasMouseDown', e)
    setActiveObject(e.target || null)
  }

  const canvasMouseMove = (e: fabric.IEvent) => {
    // console.log('canvasMouseMove', e)

    // Drawing new
    if (!!activeTool) {
      initDraw()
    }
  }

  const canvasMouseUp = (e: fabric.IEvent) => {
    console.log('canvasMouseUp', e)
    setActiveObject(e.target || null)
  }
  // BEGIN: canvas events

  useEffect(() => {
    if (canvas) {
      canvas!.on('mouse:down', canvasMouseDown)
      canvas!.on('mouse:move', canvasMouseMove)
      canvas!.on('mouse:up', canvasMouseUp)

      return () => {
        canvas!.off('mouse:down', canvasMouseDown)
        canvas!.off('mouse:move', canvasMouseMove)
        canvas!.off('mouse:up', canvasMouseUp)
      }
    }
  }, [canvas])

  return null
}

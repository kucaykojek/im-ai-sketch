'use client'

import { Canvas } from 'fabric'
import { Loader2Icon } from 'lucide-react'
import { createRef, useCallback, useEffect, useRef } from 'react'

import SketchDrawListener from './SketchDraw.listener'
import { CANVAS_ID, PRIMARY_COLOR_HEX } from './data/constants'
import useSketchDrawStore from './store/SketchDraw.store'
import {
  drawCanvasFromStorage,
  getCanvasBackgroundFromStorage
} from './utils/canvas'
import historyManager from './utils/history'

export default function SketchDraw() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const {
    isReady,
    containerSize,
    canvas,
    canvasOptions,
    setIsReady,
    setCanvasRef,
    setContainerRef,
    setHistory,
    pushHistoryState,
    setCanvas,
    setCanvasOptions
  } = useSketchDrawStore()

  // Init canvas function
  const initCanvas = useCallback(async () => {
    if (!containerRef.current) {
      return
    }

    if (!canvasRef.current) {
      return
    }

    const backgroundColor =
      getCanvasBackgroundFromStorage() || canvasOptions.backgroundColor
    const width = containerRef.current.offsetWidth
    const height = containerRef.current.offsetHeight

    setCanvasOptions({
      backgroundColor,
      width,
      height
    })

    if (!canvas) {
      const newCanvas = new Canvas(canvasRef.current, {
        backgroundColor,
        width,
        height,
        selectionBorderColor: PRIMARY_COLOR_HEX,
        selectionLineWidth: 1,
        preserveObjectStacking: true
      })

      setCanvas(newCanvas)
      await drawCanvasFromStorage(newCanvas)

      setHistory(historyManager())
      pushHistoryState(newCanvas.toDatalessJSON())
    } else {
      canvas.backgroundColor = backgroundColor

      if (canvas.width != width || canvas.height != height) {
        const scaleX = width / canvas.width
        const scaleY = height / canvas.height
        var objects = canvas.getObjects()

        objects.forEach((obj) => {
          obj.scaleX = obj.scaleX * scaleX
          obj.scaleY = obj.scaleY * scaleY
          obj.left = obj.left * scaleX
          obj.top = obj.top * scaleY
          obj.setCoords()
        })

        canvas.discardActiveObject()
        canvas.requestRenderAll()
        canvas.calcOffset()
      }

      canvas.setDimensions({ width, height })
    }

    setIsReady(true)
  }, [containerSize, canvasOptions.backgroundColor])

  useEffect(() => {
    initCanvas()
  }, [initCanvas])

  useEffect(() => {
    setCanvasRef(canvasRef)
    setContainerRef(containerRef)

    return () => {
      setCanvasRef(createRef())
      setContainerRef(createRef())
    }
  }, [setCanvasRef, setContainerRef])

  return (
    <div
      id={`${CANVAS_ID}-container`}
      ref={containerRef}
      className="relative h-full overflow-hidden rounded-xl bg-white"
      style={{ backgroundColor: canvasOptions.backgroundColor as string }}
    >
      {!isReady && (
        <div className="absolute z-30 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Loader2Icon className="w-12 h-12 animate-spin text-primary" />
        </div>
      )}
      <canvas
        id={CANVAS_ID}
        ref={canvasRef}
        width={canvasOptions.width}
        height={canvasOptions.height}
      />
      <SketchDrawListener initCanvas={initCanvas} />
    </div>
  )
}

'use client'

import { Loader2Icon } from 'lucide-react'

import useSketchDrawContext from './SketchDraw.context'
import SketchDrawListener from './SketchDraw.listener'
import { CANVAS_ID } from './data/constants'
import useCanvas from './store/useCanvas'

export default function SketchDraw() {
  const { isReady, containerRef, canvasRef } = useSketchDrawContext()
  const { canvasOptions } = useCanvas()

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
      <SketchDrawListener />
    </div>
  )
}

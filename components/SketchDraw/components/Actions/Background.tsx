import { ChangeEvent } from 'react'

import useSketchDrawContext from '../../SketchDraw.context'
import useCanvas from '../../store/useCanvas'
import { saveBackgroundToStorage } from '../../utils/canvas'
import { cn, isHexLight } from '../../utils/common'
import { isEraserObject } from '../../utils/object'
import style from './Actions.module.css'

const Background = () => {
  const { isReady } = useSketchDrawContext()
  const { canvas, canvasOptions, setCanvasOptions } = useCanvas()

  const handleChange = (e: ChangeEvent) => {
    const color = (e.target as HTMLInputElement).value

    setCanvasOptions({ ...canvasOptions, backgroundColor: color })
    saveBackgroundToStorage(color)

    // Recoloring all eraser / masking
    if (canvas) {
      canvas
        .getObjects()
        .filter((obj) => isEraserObject(obj))
        .forEach((obj) => {
          obj.set({ stroke: color })
        })

      canvas.requestRenderAll()
    }
  }

  return (
    <label
      htmlFor="backgroundPicker"
      title="Canvas Background"
      className={cn(
        style.action,
        style.actionColorPicker,
        !isReady && 'opacity-50',
        isHexLight(canvasOptions.backgroundColor as string)
          ? 'text-neutral-800'
          : 'text-neutral-50'
      )}
      style={{ backgroundColor: canvasOptions.backgroundColor as string }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-paint-bucket"
      >
        <path d="m19 11-8-8-8.6 8.6a2 2 0 0 0 0 2.8l5.2 5.2c.8.8 2 .8 2.8 0L19 11Z" />
        <path d="m5 2 5 5" />
        <path d="M2 13h15" />
        <path d="M22 20a2 2 0 1 1-4 0c0-1.6 1.7-2.4 2-4 .3 1.6 2 2.4 2 4Z" />
      </svg>
      <input
        id="backgroundPicker"
        type="color"
        onChange={handleChange}
        disabled={!isReady}
      />
    </label>
  )
}

export default Background

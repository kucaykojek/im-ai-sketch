import { ChangeEvent } from 'react'

import useSketchDrawContext from '@/sketch-draw/SketchDraw.context'
import useCanvasBackgroundColor from '@/sketch-draw/store/useCanvasBackgroundColor'
import useCanvasObjects from '@/sketch-draw/store/useCanvasObjects'
import isHexLight from '@/sketch-draw/utils/isHexLight'
import mergeClass from '@/sketch-draw/utils/mergeClass'
import saveBackgroundToStorage from '@/sketch-draw/utils/saveBackgroundToStorage'

import style from './Actions.module.css'

const Background = () => {
  const { isReady, canvasRef } = useSketchDrawContext()
  const { canvasBackgroundColor, setCanvasBackgroundColor } =
    useCanvasBackgroundColor()
  const { canvasObjects, updateCanvasObject } = useCanvasObjects()

  const handleChange = (e: ChangeEvent) => {
    const color = (e.target as HTMLInputElement).value
    setCanvasBackgroundColor(color)
    canvasRef.current!.style.background = color

    // Change eraser color to same as bg color
    const eraserObjects = canvasObjects.filter((obj) => obj.type === 'eraser')
    if (eraserObjects.length > 0) {
      eraserObjects.forEach((obj) => {
        updateCanvasObject(obj.id, { strokeColorHex: color })
      })
    }

    // Save background to localStorage
    saveBackgroundToStorage(color)
  }

  return (
    <label
      htmlFor="backgroundPicker"
      title="Canvas Background"
      className={mergeClass(
        style.action,
        style.actionColorPicker,
        !isReady && 'opacity-50',
        isHexLight(canvasBackgroundColor)
          ? 'text-neutral-800'
          : 'text-neutral-50'
      )}
      style={{ backgroundColor: canvasBackgroundColor }}
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

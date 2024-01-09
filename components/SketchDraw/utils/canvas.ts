import { Canvas } from 'fabric'

import { CANVAS_DEFAULT, CANVAS_STORAGE_KEY } from '../data/constants'

export const drawCanvasFromStorage = async (canvas: Canvas) => {
  if (!canvas || !localStorage) {
    return
  }

  const objectsOnStorage = localStorage.getItem(CANVAS_STORAGE_KEY) || '[]'

  ;(await canvas.loadFromJSON(objectsOnStorage)).requestRenderAll()
}

export const saveCanvasToStorage = (canvas: Canvas) => {
  if (!canvas || !localStorage) {
    return
  }

  localStorage.setItem(
    CANVAS_STORAGE_KEY,
    JSON.stringify(canvas.toDatalessJSON())
  )
}

export const getCanvasBackgroundFromStorage = () => {
  return localStorage
    ? localStorage.getItem(CANVAS_STORAGE_KEY)
      ? JSON.parse(localStorage.getItem(CANVAS_STORAGE_KEY)!)?.background ||
        CANVAS_DEFAULT.background
      : CANVAS_DEFAULT.background
    : CANVAS_DEFAULT.background
}

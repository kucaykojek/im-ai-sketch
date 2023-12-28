'use client'

import { useEffect } from 'react'

import { useSketchDrawerContext } from './SketchDrawer.context'
import SketchDrawerHandler from './SketchDrawer.handler'
import useSketchDrawerStore from './SketchDrawer.store'
import { SELECTED_KEYS } from './data/constants'
import { FreehandTools, ShapeTools } from './data/enums'
import { SketchDrawerOptions, SketchDrawerProps } from './data/types'

const SketchDrawer = ({ id = 'sketch-drawer-canvas' }: SketchDrawerProps) => {
  const { setInstance } = useSketchDrawerContext()
  const {
    setSelectedColor,
    setSelectedTool,
    setCanvasBg,
    paths,
    canvasBg,
    freehandTools,
    shapesTools,
    selectedColor,
    selectedTool,
    brushSize
  } = useSketchDrawerStore()

  useEffect(() => {
    const storedSelectedColor =
      localStorage.getItem(SELECTED_KEYS.color) || selectedColor
    const storedSelectedTool = localStorage.getItem(SELECTED_KEYS.tool)
      ? (localStorage.getItem(SELECTED_KEYS.tool) as FreehandTools | ShapeTools)
      : selectedTool
    const storedCanvasBg = localStorage.getItem(SELECTED_KEYS.bg) || canvasBg

    setSelectedColor(storedSelectedColor)
    setSelectedTool(storedSelectedTool)
    setCanvasBg(storedCanvasBg)

    initInstance({
      logs: true,
      autosave: true,
      storeObj: {
        paths,
        canvasBg: storedCanvasBg,
        freehandTools,
        shapesTools,
        selectedColor: storedSelectedColor,
        selectedTool: storedSelectedTool,
        brushSize
      }
    })
  }, [])

  const initInstance = (opts: SketchDrawerOptions) => {
    setInstance(new SketchDrawerHandler(`#${id}`, opts))
  }

  return (
    <div
      id={id}
      className="relative h-full bg-white overflow-hidden rounded-xl"
    ></div>
  )
}

export default SketchDrawer

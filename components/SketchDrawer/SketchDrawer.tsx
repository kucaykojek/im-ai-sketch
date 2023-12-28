'use client'

import { useEffect } from 'react'

import SketchDrawerHandler from './SketchDrawer.handler'
import useSketchDrawerStore from './SketchDrawer.store'
import { SELECTED_KEYS, SELECTED_VALUES } from './data/constants'
import { SketchDrawerOptions, SketchDrawerProps } from './data/types'

const SketchDrawer = ({ id = 'sketch-drawer-canvas' }: SketchDrawerProps) => {
  const { setInstance, setSelectedColor, setSelectedTool } =
    useSketchDrawerStore()

  useEffect(() => {
    let color = SELECTED_VALUES.color
    let tool = SELECTED_VALUES.tool

    if (localStorage) {
      color = localStorage.getItem(SELECTED_KEYS.color) || SELECTED_VALUES.color
      tool = localStorage.getItem(SELECTED_KEYS.tool) || SELECTED_VALUES.tool

      setSelectedColor(color)
      setSelectedTool(tool)
    }

    initInstance({
      logs: true,
      brushSize: 3,
      autosave: true,
      color
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

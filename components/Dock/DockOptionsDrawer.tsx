import {
  EllipseOptions,
  EraserOptions,
  HighlighterOptions,
  ImageOptions,
  PencilOptions,
  RectOptions,
  TextOptions,
  TriangleOptions
} from '@/components/SketchDraw/components/Tools'
import useCanvas from '@/components/SketchDraw/store/useCanvas'
import { getSelectedType } from '@/components/SketchDraw/utils/object'
import { cn } from '@/libs/utils'

import style from './Dock.module.css'

const DockOptionsDrawer = () => {
  const { canvas, activeTool } = useCanvas()

  const selectedType = canvas
    ? getSelectedType(canvas.getActiveObjects()?.[0]) || activeTool
    : activeTool

  const isActive = canvas
    ? (!!selectedType && canvas.getActiveObjects().length === 1) || activeTool
    : false

  return (
    <div
      className={cn(style.optionsDrawer, isActive && style.optionsDrawerActive)}
    >
      {isActive && (
        <>
          {selectedType === 'highlighter' && <HighlighterOptions />}
          {selectedType === 'pencil' && <PencilOptions />}
          {selectedType === 'eraser' && <EraserOptions />}
          {selectedType === 'ellipse' && <EllipseOptions />}
          {selectedType === 'rect' && <RectOptions />}
          {selectedType === 'triangle' && <TriangleOptions />}
          {selectedType === 'textbox' && <TextOptions />}
          {activeTool === 'image' && <ImageOptions />}
        </>
      )}
    </div>
  )
}

export default DockOptionsDrawer

import {
  CircleOptions,
  EraserOptions,
  HighlighterOptions,
  ImageOptions,
  PencilOptions,
  RectangleOptions,
  TextOptions,
  TriangleOptions
} from '@/components/SketchDraw/components/Tools'
import useCanvas from '@/components/SketchDraw/store/useCanvas'
import { cn } from '@/libs/utils'

import style from './Dock.module.css'

const DockOptionsDrawer = () => {
  const { activeObject } = useCanvas()

  const selectedType = activeObject?.type

  const isActive = !!selectedType && selectedType !== 'select'

  return (
    <div
      className={cn(style.optionsDrawer, isActive && style.optionsDrawerActive)}
    >
      {/* {selectedType === 'eraser' && <EraserOptions />}
      {selectedType === 'highlighter' && <HighlighterOptions />}
      {selectedType === 'pencil' && <PencilOptions />}
      {selectedType === 'circle' && <CircleOptions />} */}
      {selectedType === 'rectangle' && <RectangleOptions />}
      {/* {selectedType === 'triangle' && <TriangleOptions />}
      {selectedType === 'text' && <TextOptions />}
      {selectedType === 'image' && <ImageOptions />} */}
    </div>
  )
}

export default DockOptionsDrawer

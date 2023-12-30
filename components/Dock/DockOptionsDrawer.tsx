import {
  CircleOptions,
  EraserOptions,
  HighlighterOptions,
  PencilOptions,
  SquareOptions,
  TextOptions,
  TriangleOptions
} from '@/components/SketchDraw/components/Tools'
import useActiveObjectId from '@/components/SketchDraw/store/useActiveObjectId'
import useCanvasObjects from '@/components/SketchDraw/store/useCanvasObjects'
import useUserMode from '@/components/SketchDraw/store/useUserMode'
import { cn } from '@/libs/utils'

import style from './Dock.module.css'

const DockOptionsDrawer = () => {
  const { userMode } = useUserMode()
  const { activeObjectId } = useActiveObjectId()
  const { canvasObjects } = useCanvasObjects()

  const selectedType =
    canvasObjects.find((obj) => obj.id === activeObjectId)?.type || userMode

  const isActive = !!selectedType && selectedType !== 'select'

  return (
    <div
      className={cn(style.optionsDrawer, isActive && style.optionsDrawerActive)}
    >
      {selectedType === 'eraser' && <EraserOptions />}
      {selectedType === 'highlighter' && <HighlighterOptions />}
      {selectedType === 'pencil' && <PencilOptions />}
      {selectedType === 'circle' && <CircleOptions />}
      {selectedType === 'square' && <SquareOptions />}
      {selectedType === 'triangle' && <TriangleOptions />}
      {selectedType === 'text' && <TextOptions />}
    </div>
  )
}

export default DockOptionsDrawer

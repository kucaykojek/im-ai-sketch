import { MousePointerClickIcon } from 'lucide-react'

import useSketchDrawContext from '../../SketchDraw.context'
import useCanvas from '../../store/useCanvas'
import { cn } from '../../utils/common'
import style from './Actions.module.css'

const Select = () => {
  const { isReady } = useSketchDrawContext()
  const { canvas, activeTool, selectedObjects, setActiveTool } = useCanvas()

  const isActive = selectedObjects.length > 0 || activeTool === null

  const handleClick = () => {
    setActiveTool(null)

    if (canvas) {
      canvas.isDrawingMode = false
    }
  }

  return (
    <button
      type="button"
      title="Select"
      className={cn(style.action, isActive && style.actionActive)}
      disabled={!isReady}
      onClick={handleClick}
    >
      <MousePointerClickIcon />
    </button>
  )
}

export default Select

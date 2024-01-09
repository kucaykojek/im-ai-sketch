import { MousePointerClickIcon } from 'lucide-react'

import useSketchDrawStore from '../../store/SketchDraw.store'
import { cn } from '../../utils/common'
import style from './Actions.module.css'

const Select = () => {
  const { isReady, canvas, selectedObjects, activeTool, setActiveTool } =
    useSketchDrawStore()

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

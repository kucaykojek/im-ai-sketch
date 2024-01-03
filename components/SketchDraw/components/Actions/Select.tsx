import { MousePointerClickIcon } from 'lucide-react'

import useSketchDrawContext from '@/sketch-draw/SketchDraw.context'
import useCanvas from '@/sketch-draw/store/useCanvas'
import { cn } from '@/sketch-draw/utils/common'

import style from './Actions.module.css'

const Select = () => {
  const { isReady } = useSketchDrawContext()
  const { activeObject, activeTool, setActiveTool } = useCanvas()

  const handleClick = () => {
    setActiveTool(null)
  }

  return (
    <button
      type="button"
      title="Select"
      className={cn(
        style.action,
        (!!activeObject || (!activeObject && !activeTool)) && style.actionActive
      )}
      disabled={!isReady}
      onClick={handleClick}
    >
      <MousePointerClickIcon />
    </button>
  )
}

export default Select

import { CircleIcon } from 'lucide-react'

import useSketchDrawContext from '@/sketch-draw/SketchDraw.context'
import style from '@/sketch-draw/components/Tools/Tools.module.css'
import useCanvas from '@/sketch-draw/store/useCanvas'
import { cn } from '@/sketch-draw/utils/common'

const tool = 'circle'

const CircleButton = () => {
  const { isReady } = useSketchDrawContext()
  const { activeObject, activeTool, setActiveTool } = useCanvas()

  const handleClick = () => {
    setActiveTool(activeTool === tool ? null : tool)
  }

  return (
    <>
      <button
        type="button"
        className={cn(
          style.tool,
          (activeObject?.type === tool || activeTool === tool) &&
            style.toolActive
        )}
        title="Circle"
        disabled={!isReady}
        onClick={handleClick}
      >
        <CircleIcon className={style.toolIcon} />
      </button>
    </>
  )
}

export default CircleButton

import { SquareIcon } from 'lucide-react'

import useCanvas from '@/components/SketchDraw/store/useCanvas'
import useSketchDrawContext from '@/sketch-draw/SketchDraw.context'
import style from '@/sketch-draw/components/Tools/Tools.module.css'
import { cn } from '@/sketch-draw/utils/common'

const tool = 'rectangle'

const RectangleButton = () => {
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
        title="Rectangle"
        disabled={!isReady}
        onClick={handleClick}
      >
        <SquareIcon className={style.toolIcon} />
      </button>
    </>
  )
}

export default RectangleButton

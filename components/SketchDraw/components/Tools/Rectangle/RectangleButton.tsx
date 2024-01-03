import { SquareIcon } from 'lucide-react'

import useSketchDrawContext from '@/components/SketchDraw/SketchDraw.context'
import style from '@/components/SketchDraw/components/Tools/Tools.module.css'
import useRectangleOptions from '@/components/SketchDraw/store/object/useRectangleOptions'
import useCanvas from '@/components/SketchDraw/store/useCanvas'
import { cn } from '@/components/SketchDraw/utils/common'

const tool = 'rectangle'

const RectangleButton = () => {
  const { isReady } = useSketchDrawContext()
  const { canvas, selectedObjects, activeTool, setActiveTool } = useCanvas()
  const { resetOptions } = useRectangleOptions()

  const isActive = activeTool === tool || selectedObjects?.[0]?.type === tool

  const handleClick = () => {
    setActiveTool(isActive ? null : tool)
    resetOptions()

    if (canvas && canvas.getActiveObjects().length) {
      canvas.discardActiveObject()
      canvas.requestRenderAll()
    }
  }

  return (
    <>
      <button
        type="button"
        className={cn(style.tool, isActive && style.toolActive)}
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

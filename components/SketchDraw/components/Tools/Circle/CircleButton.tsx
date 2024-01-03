import { CircleIcon } from 'lucide-react'

import useSketchDrawContext from '@/components/SketchDraw/SketchDraw.context'
import style from '@/components/SketchDraw/components/Tools/Tools.module.css'
import useCircleOptions from '@/components/SketchDraw/store/object/useCircleOptions'
import useCanvas from '@/components/SketchDraw/store/useCanvas'
import { cn } from '@/components/SketchDraw/utils/common'

const tool = 'circle'

const CircleButton = () => {
  const { isReady } = useSketchDrawContext()
  const { canvas, selectedObjects, activeTool, setActiveTool } = useCanvas()
  const { resetOptions } = useCircleOptions()

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

import { TriangleIcon } from 'lucide-react'

import useSketchDrawContext from '@/components/SketchDraw/SketchDraw.context'
import style from '@/components/SketchDraw/components/Tools/Tools.module.css'
import useTriangleOptions from '@/components/SketchDraw/store/object/useTriangleOptions'
import useCanvas from '@/components/SketchDraw/store/useCanvas'
import { cn } from '@/components/SketchDraw/utils/common'

const tool = 'triangle'

const TriangleButton = () => {
  const { isReady } = useSketchDrawContext()
  const { canvas, selectedObjects, activeTool, setActiveTool } = useCanvas()
  const { resetOptions } = useTriangleOptions()

  const isActive = activeTool === tool || selectedObjects?.[0]?.type === tool

  const handleClick = () => {
    setActiveTool(isActive ? null : tool)
    resetOptions()

    if (canvas && canvas.getActiveObjects().length > 0) {
      canvas.discardActiveObject()
      canvas.requestRenderAll()
    }
  }

  return (
    <>
      <button
        type="button"
        className={cn(style.tool, isActive && style.toolActive)}
        title="Triangle"
        disabled={!isReady}
        onClick={handleClick}
      >
        <TriangleIcon className={style.toolIcon} />
      </button>
    </>
  )
}

export default TriangleButton

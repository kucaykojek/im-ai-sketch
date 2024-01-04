import { EraserIcon } from 'lucide-react'

import useSketchDrawContext from '@/components/SketchDraw/SketchDraw.context'
import style from '@/components/SketchDraw/components/Tools/Tools.module.css'
import useEraserOptions from '@/components/SketchDraw/store/object/useEraserOptions'
import useCanvas from '@/components/SketchDraw/store/useCanvas'
import { cn } from '@/components/SketchDraw/utils/common'

const tool = 'eraser'

const EraserButton = () => {
  const { isReady } = useSketchDrawContext()
  const { canvas, activeTool, setActiveTool } = useCanvas()
  const { resetOptions } = useEraserOptions()

  const isActive = activeTool === tool

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
        title="Eraser"
        disabled={!isReady}
        onClick={handleClick}
      >
        <EraserIcon className={style.toolIcon} />
      </button>
    </>
  )
}

export default EraserButton

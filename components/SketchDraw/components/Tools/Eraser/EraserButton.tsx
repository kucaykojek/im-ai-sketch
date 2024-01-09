import { EraserIcon } from 'lucide-react'

import useSketchDrawStore from '../../../store/SketchDraw.store'
import useEraserOptions from '../../../store/options/EraserOptions.store'
import { cn } from '../../../utils/common'
import style from '../Tools.module.css'

const tool = 'eraser'

const EraserButton = () => {
  const { isReady, canvas, activeTool, setActiveTool } = useSketchDrawStore()
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
        title="Masking / Eraser"
        disabled={!isReady}
        onClick={handleClick}
      >
        <EraserIcon className={style.toolIcon} />
      </button>
    </>
  )
}

export default EraserButton

import { ImageIcon } from 'lucide-react'

import useSketchDrawStore from '../../../store/SketchDraw.store'
import { cn } from '../../../utils/common'
import style from '../Tools.module.css'

const tool = 'image'

const TextButton = () => {
  const { isReady, canvas, activeTool, setActiveTool } = useSketchDrawStore()

  const isActive = activeTool === tool

  const handleClick = () => {
    setActiveTool(isActive ? null : tool)

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
        title="Text"
        disabled={!isReady}
        onClick={handleClick}
      >
        <ImageIcon className={style.toolIcon} />
      </button>
    </>
  )
}

export default TextButton

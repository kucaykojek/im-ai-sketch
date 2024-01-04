import { ImageIcon } from 'lucide-react'

import useSketchDrawContext from '@/components/SketchDraw/SketchDraw.context'
import style from '@/components/SketchDraw/components/Tools/Tools.module.css'
import useCanvas from '@/components/SketchDraw/store/useCanvas'
import { cn } from '@/components/SketchDraw/utils/common'

const tool = 'image'

const TextButton = () => {
  const { isReady } = useSketchDrawContext()
  const { canvas, activeTool, setActiveTool } = useCanvas()

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

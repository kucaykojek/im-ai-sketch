import { TypeIcon } from 'lucide-react'

import useSketchDrawContext from '@/components/SketchDraw/SketchDraw.context'
import style from '@/components/SketchDraw/components/Tools/Tools.module.css'
import useTextOptions from '@/components/SketchDraw/store/object/useTextOptions'
import useCanvas from '@/components/SketchDraw/store/useCanvas'
import { cn } from '@/components/SketchDraw/utils/common'
import { getSelectedType } from '@/components/SketchDraw/utils/object'

const tool = 'textbox'

const TextButton = () => {
  const { isReady } = useSketchDrawContext()
  const { canvas, selectedObjects, activeTool, setActiveTool } = useCanvas()
  const { resetOptions } = useTextOptions()

  const isActive =
    activeTool === tool ||
    (selectedObjects.length === 1 &&
      getSelectedType(selectedObjects?.[0]) === tool)

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
        title="Text"
        disabled={!isReady}
        onClick={handleClick}
      >
        <TypeIcon className={style.toolIcon} />
      </button>
    </>
  )
}

export default TextButton

import { SquareIcon } from 'lucide-react'

import useSketchDrawStore from '../../../store/SketchDraw.store'
import useRectOptions from '../../../store/options/RectOptions.store'
import { cn } from '../../../utils/common'
import { getSelectedType } from '../../../utils/object'
import style from '../Tools.module.css'

const tool = 'rect'

const RectButton = () => {
  const { isReady, canvas, selectedObjects, activeTool, setActiveTool } =
    useSketchDrawStore()
  const { resetOptions } = useRectOptions()

  const isActive =
    activeTool === tool ||
    (selectedObjects.length === 1 &&
      getSelectedType(selectedObjects?.[0]) === tool)

  const handleClick = () => {
    setActiveTool(isActive ? null : tool)
    resetOptions()

    if (canvas) {
      canvas.isDrawingMode = false

      if (canvas.getActiveObjects().length) {
        canvas.discardActiveObject()
        canvas.requestRenderAll()
      }
    }
  }

  return (
    <>
      <button
        type="button"
        className={cn(style.tool, isActive && style.toolActive)}
        title="Rect"
        disabled={!isReady}
        onClick={handleClick}
      >
        <SquareIcon className={style.toolIcon} />
      </button>
    </>
  )
}

export default RectButton

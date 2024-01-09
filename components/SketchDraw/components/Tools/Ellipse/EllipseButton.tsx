import { CircleIcon } from 'lucide-react'

import useSketchDrawStore from '../../../store/SketchDraw.store'
import useEllipseOptions from '../../../store/options/EllipseOptions.store'
import { cn } from '../../../utils/common'
import { getSelectedType } from '../../../utils/object'
import style from '../Tools.module.css'

const tool = 'ellipse'

const EllipseButton = () => {
  const { isReady, canvas, selectedObjects, activeTool, setActiveTool } =
    useSketchDrawStore()
  const { resetOptions } = useEllipseOptions()

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
        title="Ellipse"
        disabled={!isReady}
        onClick={handleClick}
      >
        <CircleIcon className={style.toolIcon} />
      </button>
    </>
  )
}

export default EllipseButton

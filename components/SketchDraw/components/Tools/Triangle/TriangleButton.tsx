import { TriangleIcon } from 'lucide-react'

import useSketchDrawStore from '../../../store/SketchDraw.store'
import useTriangleOptions from '../../../store/options/TriangleOptions.store'
import { cn } from '../../../utils/common'
import { getSelectedType } from '../../../utils/object'
import style from '../Tools.module.css'

const tool = 'triangle'

const TriangleButton = () => {
  const { isReady, canvas, selectedObjects, activeTool, setActiveTool } =
    useSketchDrawStore()
  const { resetOptions } = useTriangleOptions()

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

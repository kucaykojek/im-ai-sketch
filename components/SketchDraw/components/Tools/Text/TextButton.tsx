import { TypeIcon } from 'lucide-react'

import useSketchDrawStore from '../../../store/SketchDraw.store'
import useTextOptions from '../../../store/options/TextOptions.store'
import { cn } from '../../../utils/common'
import { getSelectedType } from '../../../utils/object'
import style from '../Tools.module.css'

const tool = 'textbox'

const TextButton = () => {
  const { isReady, canvas, selectedObjects, activeTool, setActiveTool } =
    useSketchDrawStore()
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

import { HighlighterIcon } from 'lucide-react'

import useSketchDrawStore from '../../../store/SketchDraw.store'
import useHighlighterOptions from '../../../store/options/HighlighterOptions.store'
import { cn } from '../../../utils/common'
import { getSelectedType } from '../../../utils/object'
import style from '../Tools.module.css'

const tool = 'highlighter'

const HighlighterButton = () => {
  const { isReady, canvas, selectedObjects, activeTool, setActiveTool } =
    useSketchDrawStore()
  const { resetOptions } = useHighlighterOptions()

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
        title="Highlighter"
        disabled={!isReady}
        onClick={handleClick}
      >
        <HighlighterIcon className={style.toolIcon} />
      </button>
    </>
  )
}

export default HighlighterButton

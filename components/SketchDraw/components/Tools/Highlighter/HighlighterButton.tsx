import { HighlighterIcon } from 'lucide-react'

import useSketchDrawContext from '@/sketch-draw/SketchDraw.context'
import style from '@/sketch-draw/components/Tools/Tools.module.css'
import { HIGHLIGHTER_OPTIONS_DEFAULT } from '@/sketch-draw/data/constants'
import useHighlighterOptions from '@/sketch-draw/store/object/useHighlighterOptions'
import useActiveObjectId from '@/sketch-draw/store/useActiveObjectId'
import useUserMode from '@/sketch-draw/store/useUserMode'
import { cn } from '@/sketch-draw/utils/common'

const mode = 'highlighter'

const HighlighterButton = () => {
  const { isReady } = useSketchDrawContext()
  const { setActiveObjectId } = useActiveObjectId()
  const { userMode, setUserMode } = useUserMode()
  const { setOptions } = useHighlighterOptions()

  const handleClick = () => {
    setUserMode(userMode === mode ? 'select' : mode)
    setActiveObjectId(null)
    setOptions(HIGHLIGHTER_OPTIONS_DEFAULT)
  }

  return (
    <>
      <button
        type="button"
        className={cn(style.tool, userMode === mode && style.toolActive)}
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

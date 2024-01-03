import { HighlighterIcon } from 'lucide-react'

import useSketchDrawContext from '@/components/SketchDraw/SketchDraw.context'
import style from '@/components/SketchDraw/components/Tools/Tools.module.css'
import useHighlighterOptions from '@/components/SketchDraw/store/object/useHighlighterOptions'
import { cn } from '@/components/SketchDraw/utils/common'

const mode = 'highlighter'

const HighlighterButton = () => {
  const { isReady } = useSketchDrawContext()
  const { setOptions } = useHighlighterOptions()

  const handleClick = () => {
    // setOptions(HIGHLIGHTER_OPTIONS_DEFAULT)
  }

  return (
    <>
      <button
        type="button"
        className={cn(style.tool, false && style.toolActive)}
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

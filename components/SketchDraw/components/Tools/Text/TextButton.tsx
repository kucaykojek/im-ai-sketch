import { TypeIcon } from 'lucide-react'

import useSketchDrawContext from '@/components/SketchDraw/SketchDraw.context'
import style from '@/components/SketchDraw/components/Tools/Tools.module.css'
import { TEXT_OPTIONS_DEFAULT } from '@/components/SketchDraw/data/constants'
import useTextOptions from '@/components/SketchDraw/store/object/useTextOptions'
import useActiveObjectId from '@/components/SketchDraw/store/useActiveObjectId'
import useUserMode from '@/components/SketchDraw/store/useUserMode'
import { cn } from '@/components/SketchDraw/utils/common'

const mode = 'text'

const TextButton = () => {
  const { isReady } = useSketchDrawContext()
  const { setActiveObjectId } = useActiveObjectId()
  const { userMode, setUserMode } = useUserMode()
  const { setOptions } = useTextOptions()

  const handleClick = () => {
    setUserMode(userMode === mode ? 'select' : mode)
    setActiveObjectId(null)
    setOptions(TEXT_OPTIONS_DEFAULT)
  }

  return (
    <>
      <button
        type="button"
        className={cn(style.tool, userMode === 'text' && style.toolActive)}
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

import { TypeIcon } from 'lucide-react'

import useSketchDrawContext from '@/sketch-draw/SketchDraw.context'
import style from '@/sketch-draw/components/Tools/Tools.module.css'
import { TEXT_OPTIONS_DEFAULT } from '@/sketch-draw/data/constants'
import useTextOptions from '@/sketch-draw/store/object/useTextOptions'
import useActiveObjectId from '@/sketch-draw/store/useActiveObjectId'
import useUserMode from '@/sketch-draw/store/useUserMode'
import { cn } from '@/sketch-draw/utils/common'

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

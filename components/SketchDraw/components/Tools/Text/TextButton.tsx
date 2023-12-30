import { TypeIcon } from 'lucide-react'

import useSketchDrawContext from '@/sketch-draw/SketchDraw.context'
import style from '@/sketch-draw/components/Tools/Tools.module.css'
import type { UserMode } from '@/sketch-draw/data/types'
import useActiveObjectId from '@/sketch-draw/store/useActiveObjectId'
import useUserMode from '@/sketch-draw/store/useUserMode'
import { cn } from '@/sketch-draw/utils/common'

const TextButton = () => {
  const { isReady } = useSketchDrawContext()
  const { setActiveObjectId } = useActiveObjectId()
  const { userMode, setUserMode } = useUserMode()

  const handleClick = (mode: UserMode) => {
    setUserMode(mode)
    setActiveObjectId(null)
  }

  return (
    <>
      <button
        type="button"
        className={cn(style.tool, userMode === 'text' && style.toolActive)}
        title="Text"
        disabled={!isReady}
        onClick={() => handleClick(userMode === 'text' ? 'select' : 'text')}
      >
        <TypeIcon className={style.toolIcon} />
      </button>
    </>
  )
}

export default TextButton

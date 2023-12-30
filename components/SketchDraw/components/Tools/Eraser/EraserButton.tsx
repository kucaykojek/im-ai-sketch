import { EraserIcon } from 'lucide-react'

import useSketchDrawContext from '@/sketch-draw/SketchDraw.context'
import style from '@/sketch-draw/components/Tools/Tools.module.css'
import useActiveObjectId from '@/sketch-draw/store/useActiveObjectId'
import useUserMode from '@/sketch-draw/store/useUserMode'
import { cn } from '@/sketch-draw/utils/common'

const mode = 'eraser'

const EraserButton = () => {
  const { isReady } = useSketchDrawContext()
  const { setActiveObjectId } = useActiveObjectId()
  const { userMode, setUserMode } = useUserMode()

  const handleClick = () => {
    setUserMode(userMode === mode ? 'select' : mode)
    setActiveObjectId(null)
  }

  return (
    <>
      <button
        type="button"
        className={cn(style.tool, userMode === mode && style.toolActive)}
        title="Eraser/Masking"
        disabled={!isReady}
        onClick={handleClick}
      >
        <EraserIcon className={style.toolIcon} />
      </button>
    </>
  )
}

export default EraserButton

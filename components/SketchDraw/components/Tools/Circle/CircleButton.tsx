import { CircleIcon } from 'lucide-react'

import useSketchDrawContext from '@/sketch-draw/SketchDraw.context'
import style from '@/sketch-draw/components/Tools/Tools.module.css'
import { CIRCLE_OPTIONS_DEFAULT } from '@/sketch-draw/data/constants'
import useCircleOptions from '@/sketch-draw/store/object/useCircleOptions'
import useActiveObjectId from '@/sketch-draw/store/useActiveObjectId'
import useUserMode from '@/sketch-draw/store/useUserMode'
import { cn } from '@/sketch-draw/utils/common'

const mode = 'circle'

const CircleButton = () => {
  const { isReady } = useSketchDrawContext()
  const { setActiveObjectId } = useActiveObjectId()
  const { userMode, setUserMode } = useUserMode()
  const { setOptions } = useCircleOptions()

  const handleClick = () => {
    setUserMode(userMode === mode ? 'select' : mode)
    setActiveObjectId(null)
    setOptions(CIRCLE_OPTIONS_DEFAULT)
  }

  return (
    <>
      <button
        type="button"
        className={cn(style.tool, userMode === mode && style.toolActive)}
        title="Circle"
        disabled={!isReady}
        onClick={handleClick}
      >
        <CircleIcon className={style.toolIcon} />
      </button>
    </>
  )
}

export default CircleButton

import { CircleIcon } from 'lucide-react'

import useSketchDrawContext from '@/sketch-draw/SketchDraw.context'
import style from '@/sketch-draw/components/Tools/Tools.module.css'
import useActiveObjectId from '@/sketch-draw/store/useActiveObjectId'
import useUserMode from '@/sketch-draw/store/useUserMode'
import mergeClass from '@/sketch-draw/utils/mergeClass'

const mode = 'circle'

const CircleButton = () => {
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
        className={mergeClass(
          style.tool,
          userMode === mode && style.toolActive
        )}
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
import { TriangleIcon } from 'lucide-react'

import useSketchDrawContext from '@/sketch-draw/SketchDraw.context'
import style from '@/sketch-draw/components/Tools/Tools.module.css'
import { TRIANGLE_OPTIONS_DEFAULT } from '@/sketch-draw/data/constants'
import useTriangleOptions from '@/sketch-draw/store/object/useTriangleOptions'
import useActiveObjectId from '@/sketch-draw/store/useActiveObjectId'
import useUserMode from '@/sketch-draw/store/useUserMode'
import { cn } from '@/sketch-draw/utils/common'

const mode = 'triangle'

const TriangleButton = () => {
  const { isReady } = useSketchDrawContext()
  const { setActiveObjectId } = useActiveObjectId()
  const { userMode, setUserMode } = useUserMode()
  const { setOptions } = useTriangleOptions()

  const handleClick = () => {
    setUserMode(userMode === mode ? 'select' : mode)
    setActiveObjectId(null)
    setOptions(TRIANGLE_OPTIONS_DEFAULT)
  }

  return (
    <>
      <button
        type="button"
        className={cn(style.tool, userMode === mode && style.toolActive)}
        title="Triangle"
        disabled={!isReady}
        onClick={handleClick}
      >
        <TriangleIcon className={style.toolIcon} />
      </button>
    </>
  )
}

export default TriangleButton

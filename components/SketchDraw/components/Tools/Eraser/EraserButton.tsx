import { EraserIcon } from 'lucide-react'

import useSketchDrawContext from '@/components/SketchDraw/SketchDraw.context'
import style from '@/components/SketchDraw/components/Tools/Tools.module.css'
import { ERASER_OPTIONS_DEFAULT } from '@/components/SketchDraw/data/constants'
import useEraserOptions from '@/components/SketchDraw/store/object/useEraserOptions'
import useActiveObjectId from '@/components/SketchDraw/store/useActiveObjectId'
import useUserMode from '@/components/SketchDraw/store/useUserMode'
import { cn } from '@/components/SketchDraw/utils/common'

const mode = 'eraser'

const EraserButton = () => {
  const { isReady } = useSketchDrawContext()
  const { setActiveObjectId } = useActiveObjectId()
  const { userMode, setUserMode } = useUserMode()
  const { setOptions } = useEraserOptions()

  const handleClick = () => {
    setUserMode(userMode === mode ? 'select' : mode)
    setActiveObjectId(null)
    setOptions(ERASER_OPTIONS_DEFAULT)
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

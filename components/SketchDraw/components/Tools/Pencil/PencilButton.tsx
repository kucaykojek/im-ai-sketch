import { PencilIcon } from 'lucide-react'

import useSketchDrawContext from '@/components/SketchDraw/SketchDraw.context'
import style from '@/components/SketchDraw/components/Tools/Tools.module.css'
import { PENCIL_OPTIONS_DEFAULT } from '@/components/SketchDraw/data/constants'
import usePencilOptions from '@/components/SketchDraw/store/object/usePencilOptions'
import useActiveObjectId from '@/components/SketchDraw/store/useActiveObjectId'
import useUserMode from '@/components/SketchDraw/store/useUserMode'
import { cn } from '@/components/SketchDraw/utils/common'

const mode = 'pencil'

const PencilButton = () => {
  const { isReady } = useSketchDrawContext()
  const { setActiveObjectId } = useActiveObjectId()
  const { userMode, setUserMode } = useUserMode()
  const { setOptions } = usePencilOptions()

  const handleClick = () => {
    setUserMode(userMode === mode ? 'select' : mode)
    setActiveObjectId(null)
    setOptions(PENCIL_OPTIONS_DEFAULT)
  }

  return (
    <>
      <button
        type="button"
        className={cn(style.tool, userMode === mode && style.toolActive)}
        title="Pencil"
        disabled={!isReady}
        onClick={handleClick}
      >
        <PencilIcon className={style.toolIcon} />
      </button>
    </>
  )
}

export default PencilButton

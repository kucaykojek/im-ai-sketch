import { PencilIcon } from 'lucide-react'

import useSketchDrawContext from '@/sketch-draw/SketchDraw.context'
import style from '@/sketch-draw/components/Tools/Tools.module.css'
import { PENCIL_OPTIONS_DEFAULT } from '@/sketch-draw/data/constants'
import usePencilOptions from '@/sketch-draw/store/object/usePencilOptions'
import useActiveObjectId from '@/sketch-draw/store/useActiveObjectId'
import useUserMode from '@/sketch-draw/store/useUserMode'
import { cn } from '@/sketch-draw/utils/common'

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

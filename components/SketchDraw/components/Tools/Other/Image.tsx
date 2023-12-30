import { ImageIcon } from 'lucide-react'

import useSketchDrawContext from '../../../SketchDraw.context'
import type { UserMode } from '../../../data/types'
import useActiveObjectId from '../../../store/useActiveObjectId'
import useUserMode from '../../../store/useUserMode'
import mergeClass from '../../../utils/mergeClass'
import style from '../Tools.module.css'

const ToolsImage = () => {
  const { canvasRef } = useSketchDrawContext()
  const { setActiveObjectId } = useActiveObjectId()
  const { userMode, setUserMode } = useUserMode()

  const handleClick = (mode: UserMode) => {
    setUserMode(mode)
    setActiveObjectId(null)
  }

  return (
    <>
      <button
        className={mergeClass(
          style.tool,
          userMode === 'image' && style.toolActive
        )}
        title="Text"
        disabled={!canvasRef}
        onClick={() => handleClick(userMode === 'image' ? 'select' : 'image')}
      >
        <ImageIcon className={style.toolIcon} />
      </button>
    </>
  )
}

export default ToolsImage

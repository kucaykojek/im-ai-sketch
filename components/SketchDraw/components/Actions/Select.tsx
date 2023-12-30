import { MousePointerClickIcon } from 'lucide-react'

import useSketchDrawContext from '../../SketchDraw.context'
import useUserMode from '../../store/useUserMode'
import mergeClass from '../../utils/mergeClass'
import style from './Actions.module.css'

const Select = () => {
  const { canvasRef } = useSketchDrawContext()
  const { userMode, setUserMode } = useUserMode()

  const handleSelectClick = () => {
    setUserMode('select')
  }

  return (
    <button
      title="Select"
      className={mergeClass(
        style.action,
        userMode === 'select' && style.actionActive
      )}
      disabled={!canvasRef}
      onClick={handleSelectClick}
    >
      <MousePointerClickIcon />
    </button>
  )
}

export default Select

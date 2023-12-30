import { MousePointerClickIcon } from 'lucide-react'

import useSketchDrawContext from '@/sketch-draw/SketchDraw.context'
import useUserMode from '@/sketch-draw/store/useUserMode'
import mergeClass from '@/sketch-draw/utils/mergeClass'

import style from './Actions.module.css'

const Select = () => {
  const { isReady } = useSketchDrawContext()
  const { userMode, setUserMode } = useUserMode()

  const handleSelectClick = () => {
    setUserMode('select')
  }

  return (
    <button
      type="button"
      title="Select"
      className={mergeClass(
        style.action,
        userMode === 'select' && style.actionActive
      )}
      disabled={!isReady}
      onClick={handleSelectClick}
    >
      <MousePointerClickIcon />
    </button>
  )
}

export default Select

import { MousePointerClickIcon } from 'lucide-react'

import useUserMode from '../../store/useUserMode'
import mergeClass from '../../utils/mergeClass'
import style from './Actions.module.css'

const Select = () => {
  const { userMode, setUserMode } = useUserMode()

  const handleSelectClick = () => {
    setUserMode('select')
  }

  return (
    <button
      className={mergeClass(
        style.action,
        userMode === 'select' && style.actionActive
      )}
      onClick={handleSelectClick}
    >
      <MousePointerClickIcon />
    </button>
  )
}

export default Select

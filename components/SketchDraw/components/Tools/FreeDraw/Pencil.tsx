import { PencilIcon } from 'lucide-react'

import mergeClass from '../../../utils/mergeClass'
import style from '../Tools.module.css'
import useFreeDrawHandler from './useFreeDrawHandler'

const ToolsPencil = () => {
  const { userMode, handleClick, disabled } = useFreeDrawHandler()

  return (
    <>
      <button
        className={mergeClass(
          style.tool,
          userMode === 'pencil' && style.toolActive
        )}
        title="Pencil"
        disabled={disabled}
        onClick={() => handleClick(userMode === 'pencil' ? 'select' : 'pencil')}
      >
        <PencilIcon className={style.toolIcon} />
      </button>
    </>
  )
}

export default ToolsPencil

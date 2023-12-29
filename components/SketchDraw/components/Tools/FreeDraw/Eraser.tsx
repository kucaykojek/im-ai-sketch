import { EraserIcon } from 'lucide-react'

import mergeClass from '../../../utils/mergeClass'
import style from '../Tools.module.css'
import useFreeDrawHandler from './useFreeDrawHandler'

const ToolsEraser = () => {
  const { userMode, handleClick, disabled } = useFreeDrawHandler()

  return (
    <>
      <button
        className={mergeClass(
          style.tool,
          userMode === 'eraser' && style.toolActive
        )}
        title="Eraser"
        disabled={disabled}
        onClick={() => handleClick('eraser')}
      >
        <EraserIcon className={style.toolIcon} />
      </button>
    </>
  )
}

export default ToolsEraser

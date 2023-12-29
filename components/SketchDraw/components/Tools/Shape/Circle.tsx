import { CircleIcon } from 'lucide-react'

import mergeClass from '../../../utils/mergeClass'
import style from '../Tools.module.css'
import useShapeHandler from './useShapeHandler'

const ToolsCircle = () => {
  const { userMode, handleClick, disabled } = useShapeHandler()

  return (
    <>
      <button
        className={mergeClass(
          style.tool,
          userMode === 'circle' && style.toolActive
        )}
        title="Circle"
        onClick={() => handleClick('circle')}
        disabled={disabled}
      >
        <CircleIcon className={style.toolIcon} />
      </button>
    </>
  )
}

export default ToolsCircle

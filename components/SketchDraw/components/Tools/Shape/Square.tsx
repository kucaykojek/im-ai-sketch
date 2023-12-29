import { SquareIcon } from 'lucide-react'

import mergeClass from '../../../utils/mergeClass'
import style from '../Tools.module.css'
import useShapeHandler from './useShapeHandler'

const ToolsSquare = () => {
  const { userMode, handleClick, disabled } = useShapeHandler()

  return (
    <>
      <button
        className={mergeClass(
          style.tool,
          userMode === 'square' && style.toolActive
        )}
        title="Square"
        onClick={() => handleClick('square')}
        disabled={disabled}
      >
        <SquareIcon className={style.toolIcon} />
      </button>
    </>
  )
}

export default ToolsSquare

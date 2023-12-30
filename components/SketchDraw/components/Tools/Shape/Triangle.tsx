import { TriangleIcon } from 'lucide-react'

import mergeClass from '../../../utils/mergeClass'
import style from '../Tools.module.css'
import useShapeHandler from './useShapeHandler'

const ToolsTriangle = () => {
  const { userMode, handleClick, disabled } = useShapeHandler()

  return (
    <>
      <button
        className={mergeClass(
          style.tool,
          userMode === 'triangle' && style.toolActive
        )}
        title="Triangle"
        disabled={disabled}
        onClick={() =>
          handleClick(userMode === 'triangle' ? 'select' : 'triangle')
        }
      >
        <TriangleIcon className={style.toolIcon} />
      </button>
    </>
  )
}

export default ToolsTriangle

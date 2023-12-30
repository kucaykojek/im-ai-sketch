import { HighlighterIcon } from 'lucide-react'

import mergeClass from '../../../utils/mergeClass'
import style from '../Tools.module.css'
import useFreeDrawHandler from './useFreeDrawHandler'

const ToolsHighlighter = () => {
  const { userMode, handleClick, disabled } = useFreeDrawHandler()

  return (
    <>
      <button
        className={mergeClass(
          style.tool,
          userMode === 'highlighter' && style.toolActive
        )}
        title="Highlighter"
        disabled={disabled}
        onClick={() =>
          handleClick(userMode === 'highlighter' ? 'select' : 'highlighter')
        }
      >
        <HighlighterIcon className={style.toolIcon} />
      </button>
    </>
  )
}

export default ToolsHighlighter

import { HighlighterIcon } from 'lucide-react'

import { cn } from '@/libs/utils'

import useSketchDrawerStore from '../../SketchDrawer.store'
import { FreehandTools } from '../../data/enums'
import style from '../Tools.module.css'

const ToolsHighlighter = () => {
  const { instance, selectedTool, setSelectedTool } = useSketchDrawerStore()

  const handleClick = () => {
    setSelectedTool(FreehandTools.Highlighter)
    instance?.highlighter()
  }

  return (
    <>
      <button
        className={cn(
          style.tool,
          selectedTool === FreehandTools.Highlighter && style.toolActive
        )}
        title="Highlighter"
        disabled={!instance}
        onClick={handleClick}
      >
        <HighlighterIcon className={style.toolIcon} />
      </button>
    </>
  )
}

export default ToolsHighlighter

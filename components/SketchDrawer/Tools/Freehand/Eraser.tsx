import { EraserIcon } from 'lucide-react'

import { cn } from '@/libs/utils'

import { useSketchDrawerContext } from '../../SketchDrawer.context'
import useSketchDrawerStore from '../../SketchDrawer.store'
import { FreehandTools } from '../../data/enums'
import style from '../Tools.module.css'

const ToolsEraser = () => {
  const { instance } = useSketchDrawerContext()
  const { selectedTool, setSelectedTool } = useSketchDrawerStore()

  const handleClick = () => {
    setSelectedTool(FreehandTools.Eraser)
    instance?.eraser()
  }

  return (
    <>
      <button
        className={cn(
          style.tool,
          selectedTool === FreehandTools.Eraser && style.toolActive
        )}
        title="Eraser"
        disabled={!instance}
        onClick={handleClick}
      >
        <EraserIcon className={style.toolIcon} />
      </button>
    </>
  )
}

export default ToolsEraser

import { SquareIcon } from 'lucide-react'

import { cn } from '@/libs/utils'

import useSketchDrawerStore from '../../SketchDrawer.store'
import { ShapeTools } from '../../data/enums'
import style from '../Tools.module.css'

const ToolsSquare = () => {
  const { selectedTool, setSelectedTool } = useSketchDrawerStore()

  const handleClick = () => {
    setSelectedTool(ShapeTools.Square)
  }

  return (
    <>
      <button
        className={cn(
          style.tool,
          selectedTool === ShapeTools.Square && style.toolActive
        )}
        title="Square"
        onClick={handleClick}
        disabled
      >
        <SquareIcon className={style.toolIcon} />
      </button>
    </>
  )
}

export default ToolsSquare

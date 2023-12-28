import { CircleIcon } from 'lucide-react'

import { cn } from '@/libs/utils'

import useSketchDrawerStore from '../../SketchDrawer.store'
import { ShapeTools } from '../../data/enums'
import style from '../Tools.module.css'

const ToolsCircle = () => {
  const { selectedTool, setSelectedTool } = useSketchDrawerStore()

  const handleClick = () => {
    setSelectedTool(ShapeTools.Circle)
  }

  return (
    <>
      <button
        className={cn(
          style.tool,
          selectedTool === ShapeTools.Circle && style.toolActive
        )}
        title="Circle"
        onClick={handleClick}
        disabled
      >
        <CircleIcon className={style.toolIcon} />
      </button>
    </>
  )
}

export default ToolsCircle

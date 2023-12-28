import { TriangleIcon } from 'lucide-react'

import { cn } from '@/libs/utils'

import useSketchDrawerStore from '../../SketchDrawer.store'
import { ShapeTools } from '../../data/enums'
import style from '../Tools.module.css'

const ToolsTriangle = () => {
  const { selectedTool, setSelectedTool } = useSketchDrawerStore()

  const handleClick = () => {
    setSelectedTool(ShapeTools.Triangle)
  }

  return (
    <>
      <button
        className={cn(
          style.tool,
          selectedTool === ShapeTools.Triangle && style.toolActive
        )}
        title="Triangle"
        onClick={handleClick}
        disabled
      >
        <TriangleIcon className={style.toolIcon} />
      </button>
    </>
  )
}

export default ToolsTriangle

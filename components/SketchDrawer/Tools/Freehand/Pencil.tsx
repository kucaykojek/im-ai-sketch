import { PencilIcon } from 'lucide-react'

import { cn } from '@/libs/utils'

import useSketchDrawerStore from '../../SketchDrawer.store'
import { FreehandTools } from '../../data/enums'
import style from '../Tools.module.css'

const ToolsPencil = () => {
  const { instance, selectedTool, setSelectedTool } = useSketchDrawerStore()

  const handleClick = () => {
    setSelectedTool(FreehandTools.Pencil)
    instance?.pencil()
  }

  return (
    <>
      <button
        className={cn(
          style.tool,
          selectedTool === FreehandTools.Pencil && style.toolActive
        )}
        title="Pencil"
        disabled={!instance}
        onClick={handleClick}
      >
        <PencilIcon className={style.toolIcon} />
      </button>
    </>
  )
}

export default ToolsPencil

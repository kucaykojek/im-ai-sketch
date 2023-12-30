import { ImageIcon } from 'lucide-react'

import useSketchDrawContext from '@/sketch-draw/SketchDraw.context'
import style from '@/sketch-draw/components/Tools/Tools.module.css'
import type { UserMode } from '@/sketch-draw/data/types'
import useActiveObjectId from '@/sketch-draw/store/useActiveObjectId'
import useUserMode from '@/sketch-draw/store/useUserMode'
import { cn } from '@/sketch-draw/utils/common'

const ImageButton = () => {
  const { isReady } = useSketchDrawContext()
  const { setActiveObjectId } = useActiveObjectId()
  const { userMode, setUserMode } = useUserMode()

  const handleClick = (mode: UserMode) => {
    setUserMode(mode)
    setActiveObjectId(null)
  }

  return (
    <>
      <button
        type="button"
        className={cn(style.tool, userMode === 'image' && style.toolActive)}
        title="Image"
        disabled={!isReady}
        onClick={() => handleClick(userMode === 'image' ? 'select' : 'image')}
      >
        <ImageIcon className={style.toolIcon} />
      </button>
    </>
  )
}

export default ImageButton

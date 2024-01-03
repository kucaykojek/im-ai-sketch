import { ImageIcon } from 'lucide-react'

import useSketchDrawContext from '@/components/SketchDraw/SketchDraw.context'
import style from '@/components/SketchDraw/components/Tools/Tools.module.css'
import type { UserMode } from '@/components/SketchDraw/data/types'
import useActiveObjectId from '@/components/SketchDraw/store/useActiveObjectId'
import useUserMode from '@/components/SketchDraw/store/useUserMode'
import { cn } from '@/components/SketchDraw/utils/common'

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

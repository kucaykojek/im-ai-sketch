import { ImageIcon } from 'lucide-react'

import useSketchDrawContext from '@/components/SketchDraw/SketchDraw.context'
import style from '@/components/SketchDraw/components/Tools/Tools.module.css'
import { cn } from '@/components/SketchDraw/utils/common'

const ImageButton = () => {
  const disabled = true
  const { isReady } = useSketchDrawContext()

  const handleClick = () => {}

  return (
    <>
      <button
        type="button"
        className={cn(style.tool, !disabled && style.toolActive)}
        title="Image"
        disabled={disabled || !isReady}
        onClick={handleClick}
      >
        <ImageIcon className={style.toolIcon} />
      </button>
    </>
  )
}

export default ImageButton

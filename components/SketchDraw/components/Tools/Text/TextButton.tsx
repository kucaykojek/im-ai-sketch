import { TypeIcon } from 'lucide-react'

import useSketchDrawContext from '@/components/SketchDraw/SketchDraw.context'
import style from '@/components/SketchDraw/components/Tools/Tools.module.css'
import { cn } from '@/components/SketchDraw/utils/common'

const TextButton = () => {
  const disabled = true
  const { isReady } = useSketchDrawContext()

  const handleClick = () => {}

  return (
    <>
      <button
        type="button"
        className={cn(style.tool, !disabled && style.toolActive)}
        title="Text"
        disabled={disabled || !isReady}
        onClick={handleClick}
      >
        <TypeIcon className={style.toolIcon} />
      </button>
    </>
  )
}

export default TextButton

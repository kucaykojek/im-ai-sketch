import { RefreshCcwIcon } from 'lucide-react'

import useSketchDrawContext from '@/components/SketchDraw/SketchDraw.context'
import useCanvas from '@/components/SketchDraw/store/useCanvas'
import useAISketchStore from '@/store/ai-sketch.store'

import useGenerateHandler from '../../GenerateImage.handler'
import style from './Actions.module.css'

const Regenerate = () => {
  const { canvas } = useCanvas()
  const { canvasRef } = useSketchDrawContext()
  const { generateImage } = useGenerateHandler()
  const { enabled, payload, generating } = useAISketchStore()

  const isDisabled =
    !enabled ||
    !canvasRef.current ||
    !canvas ||
    canvas.getActiveObjects().length > 0 ||
    !payload.prompt ||
    !payload.strength ||
    generating

  const handleClick = () => {
    if (isDisabled) {
      return
    }

    generateImage()
  }

  return (
    <button
      title="Re-Generate"
      className={style.action}
      disabled={isDisabled}
      onClick={handleClick}
    >
      <RefreshCcwIcon />
    </button>
  )
}

export default Regenerate

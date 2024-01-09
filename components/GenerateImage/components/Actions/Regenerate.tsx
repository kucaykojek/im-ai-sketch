import { RefreshCcwIcon } from 'lucide-react'

import useSketchDrawStore from '@/components/SketchDraw/store/SketchDraw.store'
import useAISketchStore from '@/store/ai-sketch.store'

import useGenerateHandler from '../../GenerateImage.handler'
import style from './Actions.module.css'

const Regenerate = () => {
  const { canvasRef, canvas } = useSketchDrawStore()
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

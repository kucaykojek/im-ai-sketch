import { FileIcon } from 'lucide-react'

import useSketchDrawContext from '@/sketch-draw/SketchDraw.context'
import { CANVAS_DEFAULT } from '@/sketch-draw/data/constants'
import useCanvas from '@/sketch-draw/store/useCanvas'

import style from './Actions.module.css'

const New = () => {
  const { isReady } = useSketchDrawContext()
  const { setCanvasOptions } = useCanvas()

  const handleNewClick = () => {
    setCanvasOptions({ backgroundColor: CANVAS_DEFAULT.background })
  }

  return (
    <button
      type="button"
      title="Clear Canvas"
      className={style.action}
      disabled={!isReady}
      onClick={handleNewClick}
    >
      <FileIcon />
    </button>
  )
}

export default New

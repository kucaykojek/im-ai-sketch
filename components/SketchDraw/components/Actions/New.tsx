import { FileIcon } from 'lucide-react'

import useSketchDrawContext from '../../SketchDraw.context'
import { CANVAS_DEFAULT } from '../../data/constants'
import useCanvas from '../../store/useCanvas'
import saveBackgroundToStorage from '../../utils/saveBackgroundToStorage'
import style from './Actions.module.css'

const New = () => {
  const { isReady } = useSketchDrawContext()
  const { canvas, setCanvasOptions } = useCanvas()

  const handleNewClick = () => {
    const color = CANVAS_DEFAULT.background
    setCanvasOptions({ backgroundColor: color })
    saveBackgroundToStorage(color)

    if (canvas) {
      canvas.setBackgroundColor(color, () => {})
      canvas.clear()
    }
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

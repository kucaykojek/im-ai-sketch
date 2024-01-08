import { FileIcon } from 'lucide-react'

import useSketchDrawContext from '../../SketchDraw.context'
import { CANVAS_DEFAULT } from '../../data/constants'
import useCanvas from '../../store/useCanvas'
import { saveBackgroundToStorage } from '../../utils/canvas'
import { saveObjectsToStorage } from '../../utils/object'
import style from './Actions.module.css'

const New = () => {
  const { isReady } = useSketchDrawContext()
  const { canvas, canvasOptions, setCanvasOptions } = useCanvas()

  const handleNewClick = () => {
    const color = CANVAS_DEFAULT.background
    setCanvasOptions({ ...canvasOptions, backgroundColor: color })
    saveBackgroundToStorage(color)

    if (canvas) {
      canvas.backgroundColor = color
      canvas.clear()
      saveObjectsToStorage(canvas)
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

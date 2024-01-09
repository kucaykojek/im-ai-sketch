import { FileIcon } from 'lucide-react'

import { CANVAS_DEFAULT } from '../../data/constants'
import useSketchDrawStore from '../../store/SketchDraw.store'
import { saveCanvasToStorage } from '../../utils/canvas'
import style from './Actions.module.css'

const New = () => {
  const { isReady, canvas, canvasOptions, setCanvasOptions } =
    useSketchDrawStore()

  const handleNewClick = () => {
    const color = CANVAS_DEFAULT.background
    setCanvasOptions({ ...canvasOptions, backgroundColor: color })

    if (canvas) {
      canvas.clear()
      canvas.backgroundColor = color
      saveCanvasToStorage(canvas)
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

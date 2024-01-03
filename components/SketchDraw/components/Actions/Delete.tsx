import { Trash2Icon } from 'lucide-react'

import useSketchDrawContext from '../../SketchDraw.context'
import useCanvas from '../../store/useCanvas'
import style from './Actions.module.css'

const Delete = () => {
  const { isReady } = useSketchDrawContext()
  const { canvas, selectedObjects } = useCanvas()

  const handleClick = () => {
    if (!canvas) {
      return
    }

    if (selectedObjects.length === 0) {
      return
    }

    canvas.getActiveObjects().forEach((obj) => {
      canvas.remove(obj)
    })

    canvas.discardActiveObject()
    canvas.requestRenderAll()
  }

  return (
    <button
      type="button"
      title="Delete"
      className={style.action}
      disabled={!isReady || selectedObjects.length === 0}
      onClick={handleClick}
    >
      <Trash2Icon />
    </button>
  )
}

export default Delete

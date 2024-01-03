import { fabric } from 'fabric'
import { CopyIcon } from 'lucide-react'

import useSketchDrawContext from '../../SketchDraw.context'
import useCanvas from '../../store/useCanvas'
import style from './Actions.module.css'

const Duplicate = () => {
  const { isReady } = useSketchDrawContext()
  const { canvas, selectedObjects } = useCanvas()

  const handleClick = () => {
    if (!canvas) {
      return
    }

    if (selectedObjects.length !== 1) {
      return
    }

    canvas!.getActiveObject()!.clone((cloned: fabric.Object) => {
      canvas.add(cloned)
      cloned.set({
        left: cloned.left! + 10,
        top: cloned.top! + 10
      })

      canvas.setActiveObject(cloned)
      canvas.renderAll()
    })
  }

  return (
    <button
      type="button"
      title="Duplicate"
      className={style.action}
      disabled={!isReady || selectedObjects.length !== 1}
      onClick={handleClick}
    >
      <CopyIcon />
    </button>
  )
}

export default Duplicate

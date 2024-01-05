import { CopyIcon } from 'lucide-react'

import useSketchDrawContext from '../../SketchDraw.context'
import useCanvas from '../../store/useCanvas'
import style from './Actions.module.css'

const Duplicate = () => {
  const { isReady } = useSketchDrawContext()
  const { canvas, selectedObjects } = useCanvas()

  const selectedObject = selectedObjects?.[0] || null

  const handleClick = async () => {
    if (!canvas) {
      return
    }

    if (!selectedObject) {
      return
    }

    const cloned = await selectedObject.clone()

    canvas.add(cloned)
    cloned.set({
      left: cloned.left! + 10,
      top: cloned.top! + 10
    })

    canvas.setActiveObject(cloned)
    canvas.renderAll()
  }

  return (
    <button
      type="button"
      title="Duplicate"
      className={style.action}
      disabled={!isReady || !selectedObject}
      onClick={handleClick}
    >
      <CopyIcon />
    </button>
  )
}

export default Duplicate

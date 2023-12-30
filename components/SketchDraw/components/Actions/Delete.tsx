import { Trash2Icon } from 'lucide-react'

import useSketchDrawContext from '../../SketchDraw.context'
import useCanvasObjects from '../../store/useCanvasObjects'
import mergeClass from '../../utils/mergeClass'
import saveObjectsToStorage from '../../utils/saveObjectsToStorage'
import style from './Actions.module.css'

const Delete = () => {
  const { canvasRef } = useSketchDrawContext()
  const { resetCanvasObjects } = useCanvasObjects()

  const handleDeleteClick = () => {
    resetCanvasObjects()

    // Save to local storage
    saveObjectsToStorage([])
    saveObjectsToStorage([])
  }

  return (
    <button
      title="Clear Canvas"
      className={mergeClass(style.action, 'text-red-500')}
      disabled={!canvasRef}
      onClick={handleDeleteClick}
    >
      <Trash2Icon />
    </button>
  )
}

export default Delete

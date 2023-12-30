import { Trash2Icon } from 'lucide-react'

import useSketchDrawContext from '@/sketch-draw/SketchDraw.context'
import useCanvasObjects from '@/sketch-draw/store/useCanvasObjects'
import mergeClass from '@/sketch-draw/utils/mergeClass'
import saveObjectsToStorage from '@/sketch-draw/utils/saveObjectsToStorage'

import style from './Actions.module.css'

const Delete = () => {
  const { isReady } = useSketchDrawContext()
  const { resetCanvasObjects } = useCanvasObjects()

  const handleDeleteClick = () => {
    resetCanvasObjects()

    // Save to local storage
    saveObjectsToStorage([])
    saveObjectsToStorage([])
  }

  return (
    <button
      type="button"
      title="Clear Canvas"
      className={mergeClass(style.action, 'text-red-500')}
      disabled={!isReady}
      onClick={handleDeleteClick}
    >
      <Trash2Icon />
    </button>
  )
}

export default Delete

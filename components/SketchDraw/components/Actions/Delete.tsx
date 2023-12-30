import { Trash2Icon } from 'lucide-react'

import useSketchDrawContext from '@/sketch-draw/SketchDraw.context'
import useActiveObjectId from '@/sketch-draw/store/useActiveObjectId'
import useCanvasObjects from '@/sketch-draw/store/useCanvasObjects'
import saveObjectsToStorage from '@/sketch-draw/utils/saveObjectsToStorage'

import style from './Actions.module.css'

const Delete = () => {
  const { isReady } = useSketchDrawContext()
  const { activeObjectId, setActiveObjectId } = useActiveObjectId()
  const { canvasObjects, deleteCanvasObject } = useCanvasObjects()

  const disabled = !isReady || !activeObjectId

  const handleDeleteClick = () => {
    if (!activeObjectId) {
      return
    }

    // BEGIN: update storage
    // for saving to storage so don't have to listen of canvasObjects changes
    const filtedCanvasObjects = canvasObjects.filter(
      (obj) => obj.id !== activeObjectId
    )
    saveObjectsToStorage(filtedCanvasObjects)
    // END: update storage

    deleteCanvasObject(activeObjectId)
    setActiveObjectId(null)
  }

  return (
    <button
      type="button"
      title="Delete"
      className={style.action}
      disabled={disabled}
      onClick={handleDeleteClick}
    >
      <Trash2Icon />
    </button>
  )
}

export default Delete

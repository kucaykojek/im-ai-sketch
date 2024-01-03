import { Trash2Icon } from 'lucide-react'

import useCanvas from '@/components/SketchDraw/store/useCanvas'
import useSketchDrawContext from '@/sketch-draw/SketchDraw.context'

import style from './Actions.module.css'

const Delete = () => {
  const { isReady } = useSketchDrawContext()
  const { activeObject, setActiveObject } = useCanvas()

  const disabled = !isReady || !activeObject

  const handleDeleteClick = () => {
    if (!activeObject) {
      return
    }

    setActiveObject(null)
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

import { SaveIcon } from 'lucide-react'

import useSketchDrawStore from '../../store/SketchDraw.store'
import { saveCanvasToStorage } from '../../utils/canvas'
import style from './Actions.module.css'

const Save = () => {
  const { isReady, canvas } = useSketchDrawStore()

  const isDisabled = !isReady || (canvas?.getObjects()?.length || 0) === 0

  const handleSaveClick = () => {
    if (!canvas) {
      return
    }

    saveCanvasToStorage(canvas)
  }

  return (
    <button
      type="button"
      title="Save"
      className={style.action}
      disabled={isDisabled}
      onClick={handleSaveClick}
    >
      <SaveIcon />
    </button>
  )
}

export default Save

import { SaveIcon } from 'lucide-react'

import useSketchDrawContext from '../../SketchDraw.context'
import useCanvas from '../../store/useCanvas'
import { saveObjectsToStorage } from '../../utils/object'
import style from './Actions.module.css'

const Save = () => {
  const { isReady } = useSketchDrawContext()
  const { canvas } = useCanvas()

  const isDisabled = !isReady || (canvas?.getObjects()?.length || 0) === 0

  const handleSaveClick = () => {
    if (!canvas) {
      return
    }

    saveObjectsToStorage(canvas)
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

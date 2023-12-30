import { FileIcon } from 'lucide-react'

import useSketchDrawContext from '@/sketch-draw/SketchDraw.context'
import { COMMON_DEFAULT } from '@/sketch-draw/data/constants'
import useCanvasBackgroundColor from '@/sketch-draw/store/useCanvasBackgroundColor'
import useCanvasObjects from '@/sketch-draw/store/useCanvasObjects'
import saveBackgroundToStorage from '@/sketch-draw/utils/saveBackgroundToStorage'
import saveObjectsToStorage from '@/sketch-draw/utils/saveObjectsToStorage'

import style from './Actions.module.css'

const New = () => {
  const { isReady } = useSketchDrawContext()
  const { resetCanvasObjects } = useCanvasObjects()
  const { setCanvasBackgroundColor } = useCanvasBackgroundColor()

  const handleNewClick = () => {
    resetCanvasObjects()
    setCanvasBackgroundColor(COMMON_DEFAULT.canvasBackgroundColor)

    // Save to local storage
    saveObjectsToStorage([])
    saveBackgroundToStorage(COMMON_DEFAULT.canvasBackgroundColor)
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

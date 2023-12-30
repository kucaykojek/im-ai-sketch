import { CopyIcon } from 'lucide-react'

import useSketchDrawContext from '@/sketch-draw/SketchDraw.context'
import useActiveObjectId from '@/sketch-draw/store/useActiveObjectId'
import useCanvasObjects from '@/sketch-draw/store/useCanvasObjects'
import generateUniqueId from '@/sketch-draw/utils/generateUniqueId'
import getCanvasObjectById from '@/sketch-draw/utils/getCanvasObjectById'

import style from './Actions.module.css'

const Duplicate = () => {
  const { isReady } = useSketchDrawContext()
  const { activeObjectId, setActiveObjectId } = useActiveObjectId()
  const {
    canvasObjects,
    appendCircleObject,
    appendHighlighterObject,
    appendIconObject,
    appendImageObject,
    appendPencilObject,
    appendSquareObject,
    appendTextObject,
    appendTriangleObject
  } = useCanvasObjects()

  const activeObject = getCanvasObjectById(activeObjectId, canvasObjects)

  const disabled = !isReady || !activeObject || activeObject?.type === 'eraser'

  const handleDuplicateClick = () => {
    if (!activeObject) {
      return
    }

    const newId = generateUniqueId()
    const duplicatedObject = {
      ...activeObject,
      id: newId,
      x: activeObject.x + 50,
      y: activeObject.y + 50
    }
    switch (activeObject.type) {
      case 'highlighter':
        appendHighlighterObject(duplicatedObject)
        break
      case 'pencil':
        appendPencilObject(duplicatedObject)
        break
      case 'circle':
        appendCircleObject(duplicatedObject)
        break
      case 'square':
        appendSquareObject(duplicatedObject)
        break
      case 'triangle':
        appendTriangleObject(duplicatedObject)
        break
      case 'text':
        appendTextObject(duplicatedObject)
        break
      case 'icon':
        appendIconObject(duplicatedObject)
        break
      case 'image':
        appendImageObject(duplicatedObject)
        break
      default:
        break
    }

    setActiveObjectId(newId)
  }

  return (
    <button
      type="button"
      title="Duplicate"
      className={style.action}
      disabled={disabled}
      onClick={handleDuplicateClick}
    >
      <CopyIcon />
    </button>
  )
}

export default Duplicate

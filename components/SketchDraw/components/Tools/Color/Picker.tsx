import { ChangeEvent } from 'react'

import useSketchDrawContext from '../../../SketchDraw.context'
import useActiveObjectId from '../../../store/useActiveObjectId'
import useCanvasObjects from '../../../store/useCanvasObjects'
import useSelectedColor from '../../../store/useSelectedColor'
import isObjectCanUpdateColor from '../../../utils/isObjectCanUpdateColor'
import mergeClass from '../../../utils/mergeClass'
import replaceObjectColor from '../../../utils/replaceObjectColor'
import style from '../Tools.module.css'

const Picker = () => {
  const { canvasRef } = useSketchDrawContext()
  const { setSelectedColor } = useSelectedColor()
  const { activeObjectId } = useActiveObjectId()
  const { canvasObjects, updateCanvasObject } = useCanvasObjects()

  const handleChange = (e: ChangeEvent) => {
    const color = (e.target as HTMLInputElement).value
    setSelectedColor(color)

    if (activeObjectId) {
      const canvasObject = canvasObjects
        .filter((obj) => isObjectCanUpdateColor(obj.type))
        .find((obj) => obj.id === activeObjectId)

      if (canvasObject) {
        updateCanvasObject(activeObjectId, {
          ...replaceObjectColor(canvasObject.type, color)
        })
      }
    }
  }

  return (
    <label
      htmlFor="colorPicker"
      className={mergeClass(style.colorPicker, !canvasRef && 'opacity-50')}
    >
      <input
        id="colorPicker"
        type="color"
        disabled={!canvasRef}
        onChange={handleChange}
      />
    </label>
  )
}

export default Picker

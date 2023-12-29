import useSketchDrawContext from '../../../SketchDraw.context'
import { PALETTE_COLORS } from '../../../data/constants'
import useActiveObjectId from '../../../store/useActiveObjectId'
import useCanvasObjects from '../../../store/useCanvasObjects'
import useSelectedColor from '../../../store/useSelectedColor'
import isObjectCanUpdateColor from '../../../utils/isObjectCanUpdateColor'
import mergeClass from '../../../utils/mergeClass'
import replaceObjectColor from '../../../utils/replaceObjectColor'
import style from '../Tools.module.css'

const Palette = () => {
  const { canvasRef } = useSketchDrawContext()
  const { selectedColor, setSelectedColor } = useSelectedColor()
  const { activeObjectId } = useActiveObjectId()
  const { canvasObjects, updateCanvasObject } = useCanvasObjects()

  const handleClick = (color: string) => {
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
    <>
      {PALETTE_COLORS.map((color, index) => (
        <button
          key={`palette-${index}`}
          title={color}
          className={mergeClass(
            style.palette,
            selectedColor === color && style.paletteActive
          )}
          style={{ backgroundColor: color }}
          disabled={!canvasRef}
          onClick={() => handleClick(color)}
        ></button>
      ))}
    </>
  )
}

export default Palette

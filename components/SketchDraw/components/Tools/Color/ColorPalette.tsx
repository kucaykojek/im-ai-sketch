import useSketchDrawContext from '@/sketch-draw/SketchDraw.context'
import style from '@/sketch-draw/components/Tools/Tools.module.css'
import { PALETTE_COLORS } from '@/sketch-draw/data/constants'
import useActiveObjectId from '@/sketch-draw/store/useActiveObjectId'
import useCanvasObjects from '@/sketch-draw/store/useCanvasObjects'
import useSelectedColor from '@/sketch-draw/store/useSelectedColor'
import isObjectCanUpdateColor from '@/sketch-draw/utils/isObjectCanUpdateColor'
import mergeClass from '@/sketch-draw/utils/mergeClass'
import replaceObjectColor from '@/sketch-draw/utils/replaceObjectColor'

const ColorPalette = () => {
  const { isReady } = useSketchDrawContext()
  const { selectedColor, setSelectedColor } = useSelectedColor()
  const { activeObjectId } = useActiveObjectId()
  const { canvasObjects, updateCanvasObject } = useCanvasObjects()

  const handleSetColor = (color: string) => {
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
          type="button"
          key={`palette-${index}`}
          title={color}
          className={mergeClass(
            style.palette,
            selectedColor === color && style.paletteActive
          )}
          style={{ backgroundColor: color }}
          value={color}
          disabled={!isReady}
          onClick={() => handleSetColor(color)}
        ></button>
      ))}

      <label
        htmlFor="colorPicker"
        className={mergeClass(style.colorPicker, !isReady && 'opacity-50')}
      >
        <input
          id="colorPicker"
          type="color"
          disabled={!isReady}
          onChange={(e) => handleSetColor(e.target.value)}
        />
      </label>
    </>
  )
}

export default ColorPalette

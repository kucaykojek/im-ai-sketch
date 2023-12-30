import useSketchDrawContext from '@/sketch-draw/SketchDraw.context'
import style from '@/sketch-draw/components/Tools/Tools.module.css'
import { PALETTE_COLORS } from '@/sketch-draw/data/constants'
import useCircleOptions from '@/sketch-draw/store/object/useCircleOptions'
import useHighlighterOptions from '@/sketch-draw/store/object/useHighlighterOptions'
import usePencilOptions from '@/sketch-draw/store/object/usePencilOptions'
import useSquareOptions from '@/sketch-draw/store/object/useSquareOptions'
import useTextOptions from '@/sketch-draw/store/object/useTextOptions'
import useTriangleOptions from '@/sketch-draw/store/object/useTriangleOptions'
import useActiveObjectId from '@/sketch-draw/store/useActiveObjectId'
import useCanvasObjects from '@/sketch-draw/store/useCanvasObjects'
import useSelectedColor from '@/sketch-draw/store/useSelectedColor'
import useUserMode from '@/sketch-draw/store/useUserMode'
import isObjectCanUpdateColor from '@/sketch-draw/utils/isObjectCanUpdateColor'
import mergeClass from '@/sketch-draw/utils/mergeClass'
import replaceObjectColor from '@/sketch-draw/utils/replaceObjectColor'

const ColorPalette = () => {
  const { userMode } = useUserMode()
  const { isReady } = useSketchDrawContext()
  const { selectedColor, setSelectedColor } = useSelectedColor()
  const { activeObjectId } = useActiveObjectId()
  const { canvasObjects, updateCanvasObject } = useCanvasObjects()

  const { options: highlighterOptions, setOptions: setHighlighterOptions } =
    useHighlighterOptions()
  const { options: pencilOptions, setOptions: setPencilOptions } =
    usePencilOptions()

  const { options: circleOptions, setOptions: setCircleOptions } =
    useCircleOptions()
  const { options: squareOptions, setOptions: setSquareOptions } =
    useSquareOptions()
  const { options: triangleOptions, setOptions: setTriangleOptions } =
    useTriangleOptions()

  const { options: textOptions, setOptions: setTextOptions } = useTextOptions()

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

    if (!['select', 'image', 'icon'].includes(userMode)) {
      switch (userMode) {
        case 'pencil':
          setPencilOptions({ ...pencilOptions, strokeColorHex: color })
          break
        case 'highlighter':
          setHighlighterOptions({
            ...highlighterOptions,
            strokeColorHex: color
          })
          break
        case 'circle':
          setCircleOptions({
            ...circleOptions,
            fillColorHex:
              circleOptions.shapeType === 'fill'
                ? color
                : circleOptions.fillColorHex,
            strokeColorHex: color
          })
          break
        case 'square':
          setSquareOptions({
            ...squareOptions,
            fillColorHex:
              squareOptions.shapeType === 'fill'
                ? color
                : squareOptions.fillColorHex,
            strokeColorHex: color
          })
          break
        case 'triangle':
          setTriangleOptions({
            ...triangleOptions,
            fillColorHex:
              triangleOptions.shapeType === 'fill'
                ? color
                : triangleOptions.fillColorHex,
            strokeColorHex: color
          })
          break
        case 'text':
          setTextOptions({
            ...textOptions,
            fontColorHex: color
          })
          break

        default:
          break
      }
      if (['pencil', 'highlighter'].includes(userMode)) {
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

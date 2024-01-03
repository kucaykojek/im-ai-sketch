import useSquareOptions from '@/components/SketchDraw/store/object/useRectangleOptions'
import useSketchDrawContext from '@/sketch-draw/SketchDraw.context'
import style from '@/sketch-draw/components/Tools/Tools.module.css'
import { PALETTE_COLORS } from '@/sketch-draw/data/constants'
import useCircleOptions from '@/sketch-draw/store/object/useCircleOptions'
import useHighlighterOptions from '@/sketch-draw/store/object/useHighlighterOptions'
import usePencilOptions from '@/sketch-draw/store/object/usePencilOptions'
import useTextOptions from '@/sketch-draw/store/object/useTextOptions'
import useTriangleOptions from '@/sketch-draw/store/object/useTriangleOptions'
import { cn } from '@/sketch-draw/utils/common'
import getCanvasObjectById from '@/sketch-draw/utils/getCanvasObjectById'

const ColorPalette = () => {
  const { isReady } = useSketchDrawContext()

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
    // setObjectColor(color)
    // // drawing or selection
    // const objectType = activeObjectId
    //   ? getCanvasObjectById(activeObjectId, canvasObjects)?.type || userMode
    //   : userMode
    // // Update tools options
    // if (!['select', 'image', 'icon'].includes(objectType)) {
    //   switch (objectType) {
    //     case 'pencil':
    //       setPencilOptions({ ...pencilOptions, strokeColorHex: color })
    //       break
    //     case 'highlighter':
    //       setHighlighterOptions({
    //         ...highlighterOptions,
    //         strokeColorHex: color
    //       })
    //       break
    //     case 'circle':
    //       setCircleOptions({
    //         ...circleOptions,
    //         fillColorHex:
    //           circleOptions.shapeType === 'fill'
    //             ? color
    //             : circleOptions.fillColorHex,
    //         strokeColorHex: color
    //       })
    //       break
    //     case 'square':
    //       setSquareOptions({
    //         ...squareOptions,
    //         fillColorHex:
    //           squareOptions.shapeType === 'fill'
    //             ? color
    //             : squareOptions.fillColorHex,
    //         strokeColorHex: color
    //       })
    //       break
    //     case 'triangle':
    //       setTriangleOptions({
    //         ...triangleOptions,
    //         fillColorHex:
    //           triangleOptions.shapeType === 'fill'
    //             ? color
    //             : triangleOptions.fillColorHex,
    //         strokeColorHex: color
    //       })
    //       break
    //     case 'text':
    //       setTextOptions({
    //         ...textOptions,
    //         fontColorHex: color
    //       })
    //       break
    //     default:
    //       break
    //   }
    // }
  }

  return (
    <>
      {PALETTE_COLORS.map((color, index) => (
        <button
          type="button"
          key={`palette-${index}`}
          title={color}
          className={cn(style.palette, false && style.paletteActive)}
          style={{ backgroundColor: color }}
          value={color}
          disabled={!isReady}
          onClick={() => handleSetColor(color)}
        ></button>
      ))}

      <label
        htmlFor="colorPicker"
        className={cn(style.colorPicker, !isReady && 'opacity-50')}
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

import useSketchDrawContext from '@/components/SketchDraw/SketchDraw.context'
import style from '@/components/SketchDraw/components/Tools/Tools.module.css'
import { PALETTE_COLORS } from '@/components/SketchDraw/data/constants'
import useCircleOptions from '@/components/SketchDraw/store/object/useCircleOptions'
import useRectangleOptions from '@/components/SketchDraw/store/object/useRectangleOptions'
import useTriangleOptions from '@/components/SketchDraw/store/object/useTriangleOptions'
import useCanvas from '@/components/SketchDraw/store/useCanvas'
import { cn } from '@/components/SketchDraw/utils/common'

const ColorPalette = () => {
  const { isReady } = useSketchDrawContext()
  const { activeTool, selectedObjects } = useCanvas()

  const { options: circleOptions, setOptions: setCircleOptions } =
    useCircleOptions()
  const { options: rectangleOptions, setOptions: setRectangleOptions } =
    useRectangleOptions()
  const { options: triangleOptions, setOptions: setTriangleOptions } =
    useTriangleOptions()

  const selectedType =
    (selectedObjects.length === 1 ? selectedObjects?.[0]?.type : activeTool) ||
    'select'

  const handleSetColor = (color: string) => {
    if (!['select', 'image', 'icon'].includes(selectedType)) {
      switch (selectedType) {
        case 'circle':
          setCircleOptions({
            ...circleOptions,
            fill: color,
            stroke: color
          })
          break
        case 'rectangle':
          setRectangleOptions({
            ...rectangleOptions,
            fill: color,
            stroke: color
          })
          break
        case 'triangle':
          setTriangleOptions({
            ...triangleOptions,
            fill: color,
            stroke: color
          })
          break
        default:
          break
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

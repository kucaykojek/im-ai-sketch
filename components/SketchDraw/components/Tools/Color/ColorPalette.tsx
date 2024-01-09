import { PALETTE_COLORS } from '../../../data/constants'
import useSketchDrawStore from '../../../store/SketchDraw.store'
import useEllipseOptions from '../../../store/options/EllipseOptions.store'
import useHighlighterOptions from '../../../store/options/HighlighterOptions.store'
import usePencilOptions from '../../../store/options/PencilOptions.store'
import useRectOptions from '../../../store/options/RectOptions.store'
import useTriangleOptions from '../../../store/options/TriangleOptions.store'
import { cn } from '../../../utils/common'
import { getSelectedType } from '../../../utils/object'
import style from '../Tools.module.css'

const ColorPalette = () => {
  const { isReady, activeTool, selectedObjects } = useSketchDrawStore()

  const { options: pencilOptions, setOptions: setPencilOptions } =
    usePencilOptions()
  const { options: highlighterOptions, setOptions: setHighlighterOptions } =
    useHighlighterOptions()

  const { options: ellipseOptions, setOptions: setEllipseOptions } =
    useEllipseOptions()
  const { options: rectOptions, setOptions: setRectOptions } = useRectOptions()
  const { options: triangleOptions, setOptions: setTriangleOptions } =
    useTriangleOptions()

  const selectedType =
    getSelectedType(selectedObjects?.[0]) || activeTool || 'select'

  const handleSetColor = (color: string) => {
    if (!['select', 'image', 'icon'].includes(selectedType)) {
      switch (selectedType) {
        case 'pencil':
          setPencilOptions({
            ...pencilOptions,
            color: color
          })
          break
        case 'highlighter':
          setHighlighterOptions({
            ...highlighterOptions,
            color: color + 55
          })
          break
        case 'ellipse':
          setEllipseOptions({
            ...ellipseOptions,
            fill: color,
            stroke: color
          })
          break
        case 'rect':
          setRectOptions({
            ...rectOptions,
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

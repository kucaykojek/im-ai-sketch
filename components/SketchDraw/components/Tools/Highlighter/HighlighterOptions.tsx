import { HighlighterIcon } from 'lucide-react'
import { useEffect } from 'react'

import ColorPicker from '@/components/SketchDraw/components/ColorPicker'
import SliderRange from '@/components/SketchDraw/components/SliderRange'
import style from '@/components/SketchDraw/components/Tools/Tools.module.css'
import { HIGHLIGHTER_OPTIONS_DEFAULT } from '@/components/SketchDraw/data/constants'
import { HighlighterObject } from '@/components/SketchDraw/data/types'
import useHighlighterOptions from '@/components/SketchDraw/store/object/useHighlighterOptions'
import useCanvas from '@/components/SketchDraw/store/useCanvas'
import { cn } from '@/components/SketchDraw/utils/common'
import { isHighlighterObject } from '@/components/SketchDraw/utils/object'

const HighlighterOptions = () => {
  const { options, setOptions } = useHighlighterOptions()
  const { canvas, selectedObjects } = useCanvas()

  const handleChangeOptions = (key: any, value: any) => {
    setOptions({ ...options, [key]: value })
  }

  useEffect(() => {
    if (isHighlighterObject(selectedObjects?.[0])) {
      setOptions({
        ...HIGHLIGHTER_OPTIONS_DEFAULT,
        color:
          (
            ((selectedObjects[0] as HighlighterObject).stroke ||
              HIGHLIGHTER_OPTIONS_DEFAULT.color) as string
          ).slice(0, 7) + 55,
        width:
          (selectedObjects[0] as HighlighterObject).strokeWidth ||
          HIGHLIGHTER_OPTIONS_DEFAULT.width
      })
    }
  }, [selectedObjects])

  useEffect(() => {
    if (canvas && selectedObjects.length > 0) {
      // Change objects based on options
      canvas
        .getActiveObjects()
        .filter((obj) => isHighlighterObject(obj))
        .forEach((obj) => {
          obj.set({
            stroke:
              options.color.length < 7 ? options.color + 55 : options.color,
            strokeWidth: options.width
          })
        })

      canvas.requestRenderAll()
    }
  }, [canvas, selectedObjects, options])

  return (
    <div className={style.toolOptions}>
      <div className={style.optionsTitle}>
        <HighlighterIcon />
        Highlighter
      </div>
      <div className={style.optionsWrapper}>
        <div className={style.optionsItem}>
          <div className={style.optionsItemLabel}>Thickness</div>
          <div className={style.optionsControl}>
            <SliderRange
              id="highlighter-options-stroke-thickness"
              value={options.width}
              min={1}
              max={100}
              step={1}
              onChange={(e) =>
                handleChangeOptions('width', Number(e.target.value))
              }
            />
            <div className="text-xs font-medium w-4">{options.width}</div>
          </div>
        </div>
        <div className={cn(style.optionsItem, 'border-l')}>
          <div className={style.optionsItemLabel}>Color</div>
          <div className={style.optionsControl}>
            <ColorPicker
              id="highlighter-options-color"
              color={
                options.color.length > 7
                  ? options.color.slice(0, 7)
                  : options.color
              }
              onChange={(e) => handleChangeOptions('color', e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default HighlighterOptions

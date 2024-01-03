import { SquareIcon } from 'lucide-react'
import { useEffect } from 'react'

import ColorPicker from '@/components/SketchDraw/components/ColorPicker'
import SliderRange from '@/components/SketchDraw/components/SliderRange'
import style from '@/components/SketchDraw/components/Tools/Tools.module.css'
import { OBJECT_DEFAULT } from '@/components/SketchDraw/data/constants'
import useRectangleOptions from '@/components/SketchDraw/store/object/useRectangleOptions'
import useCanvas from '@/components/SketchDraw/store/useCanvas'
import { cn } from '@/components/SketchDraw/utils/common'

const RectangleOptions = () => {
  const { options, setOptions } = useRectangleOptions()
  const { canvas, selectedObjects } = useCanvas()

  const handleChangeOptions = (key: any, value: any) => {
    setOptions({ ...options, [key]: value })
  }

  const handleTypeChange = (shapeType: 'fill' | 'outline') => {
    if (shapeType === 'outline') {
      setOptions({
        ...options,
        fill: 'transparent',
        strokeWidth: Number(options.strokeWidth) || 1
      })
    }

    if (shapeType === 'fill') {
      setOptions({
        ...options,
        fill:
          options.fill === 'transparent' ? OBJECT_DEFAULT.color : options.fill
      })
    }
  }

  useEffect(() => {
    if (selectedObjects.length === 1) {
      setOptions({
        fill: selectedObjects[0].fill,
        stroke: selectedObjects[0].stroke,
        strokeWidth: selectedObjects[0].strokeWidth
      })
    }
  }, [selectedObjects])

  useEffect(() => {
    if (canvas && selectedObjects.length > 0) {
      // Change objects based on options
      canvas
        .getActiveObjects()
        .filter((obj) => obj.type === 'rectangle')
        .forEach((obj) => {
          obj.set({ ...options })
        })

      canvas.requestRenderAll()
    }
  }, [canvas, selectedObjects, options])

  return (
    <div className={style.toolOptions}>
      <div className={style.optionsTitle}>
        <SquareIcon />
        Square
      </div>
      <div className={style.optionsWrapper}>
        <div className={style.optionsItem}>
          <div className={style.optionsItemLabel}>Type</div>
          <div className={style.optionsControl}>
            <div className="flex items-center text-xs rounded overflow-hidden">
              <button
                type="button"
                className={cn(
                  'px-2 py-1 font-medium bg-neutral-100 hover:bg-neutral-200',
                  options.fill !== 'transparent' && '!bg-primary'
                )}
                onClick={() => handleTypeChange('fill')}
              >
                Fill
              </button>
              <button
                type="button"
                className={cn(
                  'px-2 py-1 font-medium bg-neutral-100 hover:bg-neutral-200',
                  options.fill === 'transparent' && '!bg-primary'
                )}
                onClick={() => handleTypeChange('outline')}
              >
                Outline
              </button>
            </div>
          </div>
        </div>
        <div className={cn(style.optionsItem, 'border-l')}>
          <div className={style.optionsItemLabel}>Background</div>
          <div className={style.optionsControl}>
            <ColorPicker
              id="square-options-fill-color"
              color={
                options.fill === 'transparent'
                  ? OBJECT_DEFAULT.color
                  : (options.fill as string)
              }
              disabled={options.fill === 'transparent'}
              onChange={(e) => handleChangeOptions('fill', e.target.value)}
            />
          </div>
        </div>
        <div className={cn(style.optionsItem, 'border-l')}>
          <div className={style.optionsItemLabel}>Border Thickness</div>
          <div className={style.optionsControl}>
            <SliderRange
              id="square-options-stroke-width"
              value={options.strokeWidth || 0}
              min={options.fill !== 'transparent' ? 1 : 0}
              max={100}
              step={1}
              onChange={(e) =>
                handleChangeOptions('strokeWidth', Number(e.target.value))
              }
            />
            <div className="text-xs font-medium w-4">
              {options.strokeWidth || 0}
            </div>
          </div>
        </div>
        <div className={cn(style.optionsItem, 'border-l')}>
          <div className={style.optionsItemLabel}>Border Color</div>
          <div className={style.optionsControl}>
            <ColorPicker
              id="square-options-stroke-color"
              color={options.stroke!}
              onChange={(e) => handleChangeOptions('stroke', e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default RectangleOptions

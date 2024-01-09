import { SquareIcon } from 'lucide-react'
import { useEffect } from 'react'

import { OBJECT_DEFAULT } from '../../../data/constants'
import type { ShapeObject } from '../../../data/types'
import useSketchDrawStore from '../../../store/SketchDraw.store'
import useRectOptions from '../../../store/options/RectOptions.store'
import { cn } from '../../../utils/common'
import ColorPicker from '../../ColorPicker'
import SliderRange from '../../SliderRange'
import style from '../Tools.module.css'

const RectOptions = () => {
  const { options, setOptions } = useRectOptions()
  const { canvas, selectedObjects } = useSketchDrawStore()

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
    if (selectedObjects?.[0]?.type === 'rect') {
      setOptions({
        ...options,
        fill: (selectedObjects[0] as ShapeObject).fill,
        stroke: (selectedObjects[0] as ShapeObject).stroke,
        strokeWidth: (selectedObjects[0] as ShapeObject).strokeWidth
      })
    }
  }, [selectedObjects, setOptions])

  useEffect(() => {
    if (canvas && selectedObjects.length > 0) {
      // Change objects based on options
      canvas
        .getActiveObjects()
        .filter((obj) => obj.type === 'rect')
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
        Rect
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
              id="rect-options-fill-color"
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
              id="rect-options-stroke-width"
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
              id="rect-options-stroke-color"
              color={options.stroke as string}
              onChange={(e) => handleChangeOptions('stroke', e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default RectOptions

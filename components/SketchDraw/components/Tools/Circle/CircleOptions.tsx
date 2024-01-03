import { CircleIcon } from 'lucide-react'
import { ChangeEvent, useEffect } from 'react'

import useCircleOptions from '@/components/SketchDraw/store/object/useCircleOptions'
import useCanvas from '@/components/SketchDraw/store/useCanvas'
import ColorPicker from '@/sketch-draw/components/ColorPicker'
import SliderRange from '@/sketch-draw/components/SliderRange'
import style from '@/sketch-draw/components/Tools/Tools.module.css'
import { cn } from '@/sketch-draw/utils/common'

const CircleOptions = () => {
  const { options, setOptions } = useCircleOptions()
  const { canvas, activeObject, setActiveObject } = useCanvas()

  const handleChange = (e: ChangeEvent<HTMLInputElement>, key: any) => {
    setOptions({ ...options, [key]: e.target.value })
  }

  const handleTypeChange = (shapeType: 'fill' | 'outline') => {
    setOptions({
      ...options,
      fill: shapeType === 'outline' ? 'transparent' : options.fill,
      strokeWidth:
        shapeType === 'outline' && options.strokeWidth! < 1
          ? 1
          : options.strokeWidth
    })
  }

  useEffect(() => {
    // Update canvas object
    if (activeObject?.type === 'circle') {
      // setActiveObject()
    }
  }, [options, activeObject?.type])

  return (
    <div className={style.toolOptions}>
      <div className={style.optionsTitle}>
        <CircleIcon />
        Circle
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
              id="circle-options-fill-color"
              color={options.fill as string}
              disabled={options.fill === 'transparent'}
              onChange={(e) => handleChange(e, 'fill')}
            />
          </div>
        </div>
        <div className={cn(style.optionsItem, 'border-l')}>
          <div className={style.optionsItemLabel}>Border Thickness</div>
          <div className={style.optionsControl}>
            <SliderRange
              id="circle-options-stroke-width"
              value={options.strokeWidth || 0}
              min={options.fill !== 'transparent' ? 1 : 0}
              max={100}
              step={1}
              onChange={(e) => handleChange(e, 'strokeWidth')}
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
              id="circle-options-stroke-color"
              color={options.stroke!}
              onChange={(e) => handleChange(e, 'stroke')}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CircleOptions

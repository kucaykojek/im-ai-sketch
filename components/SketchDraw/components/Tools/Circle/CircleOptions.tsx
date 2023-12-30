import { CircleIcon } from 'lucide-react'
import { ChangeEvent, useEffect } from 'react'

import ColorPicker from '@/sketch-draw/components/ColorPicker'
import SliderRange from '@/sketch-draw/components/SliderRange'
import style from '@/sketch-draw/components/Tools/Tools.module.css'
import { ShapeType } from '@/sketch-draw/data/types'
import useCircleOptions from '@/sketch-draw/store/object/useCircleOptions'
import useActiveObjectId from '@/sketch-draw/store/useActiveObjectId'
import useCanvasObjects from '@/sketch-draw/store/useCanvasObjects'
import { cn } from '@/sketch-draw/utils/common'
import getCanvasObjectById from '@/sketch-draw/utils/getCanvasObjectById'

const CircleOptions = () => {
  const { options, setOptions } = useCircleOptions()
  const { activeObjectId } = useActiveObjectId()
  const { canvasObjects, updateCanvasObject } = useCanvasObjects()

  const handleChange = (e: ChangeEvent<HTMLInputElement>, key: any) => {
    setOptions({ ...options, [key]: e.target.value })
  }

  const handleTypeChange = (shapeType: ShapeType) => {
    setOptions({
      ...options,
      shapeType,
      strokeThickness:
        shapeType === 'outline' && options.strokeThickness < 1
          ? 1
          : options.strokeThickness
    })
  }

  useEffect(() => {
    // Update canvas object
    if (
      !!activeObjectId &&
      getCanvasObjectById(activeObjectId, canvasObjects)?.type === 'circle'
    ) {
      updateCanvasObject(activeObjectId, { circleOpts: options })
    }
  }, [options])

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
                  options.shapeType === 'fill' && '!bg-primary'
                )}
                onClick={() => handleTypeChange('fill')}
              >
                Fill
              </button>
              <button
                type="button"
                className={cn(
                  'px-2 py-1 font-medium bg-neutral-100 hover:bg-neutral-200',
                  options.shapeType === 'outline' && '!bg-primary'
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
              color={options.fillColorHex}
              disabled={options.shapeType === 'outline'}
              onChange={(e) => handleChange(e, 'fillColorHex')}
            />
          </div>
        </div>
        <div className={cn(style.optionsItem, 'border-l')}>
          <div className={style.optionsItemLabel}>Border Thickness</div>
          <div className={style.optionsControl}>
            <SliderRange
              id="circle-options-stroke-thickness"
              value={options.strokeThickness}
              min={options.shapeType === 'outline' ? 1 : 0}
              max={100}
              step={1}
              onChange={(e) => handleChange(e, 'strokeThickness')}
            />
            <div className="text-xs font-medium w-4">
              {options.strokeThickness}
            </div>
          </div>
        </div>
        <div className={cn(style.optionsItem, 'border-l')}>
          <div className={style.optionsItemLabel}>Border Color</div>
          <div className={style.optionsControl}>
            <ColorPicker
              id="circle-options-stroke-color"
              color={options.strokeColorHex}
              onChange={(e) => handleChange(e, 'strokeColorHex')}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CircleOptions

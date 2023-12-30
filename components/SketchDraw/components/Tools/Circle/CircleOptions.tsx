import { CircleIcon } from 'lucide-react'
import { ChangeEvent } from 'react'

import ColorPicker from '@/sketch-draw/components/ColorPicker'
import SliderRange from '@/sketch-draw/components/SliderRange'
import style from '@/sketch-draw/components/Tools/Tools.module.css'
import useCircleOptions from '@/sketch-draw/store/object/useCircleOptions'
import mergeClass from '@/sketch-draw/utils/mergeClass'

const CircleOptions = () => {
  const { options, setOptions } = useCircleOptions()

  const handleChange = (e: ChangeEvent<HTMLInputElement>, key: any) => {
    setOptions({ ...options, [key]: e.target.value })
  }
  return (
    <div className={style.toolOptions}>
      <div className={style.optionsTitle}>
        <CircleIcon />
        Circle
      </div>
      <div className={style.optionsWrapper}>
        <div className={style.optionsItem}>
          <label>Type</label>
          <div className={style.optionsControl}>
            <div className="flex items-center text-xs rounded overflow-hidden">
              <button
                type="button"
                className={mergeClass(
                  'px-2 py-1 font-medium bg-neutral-100 hover:bg-neutral-200',
                  options.shapeType === 'fill' && '!bg-primary'
                )}
                onClick={() => setOptions({ ...options, shapeType: 'fill' })}
              >
                Fill
              </button>
              <button
                type="button"
                className={mergeClass(
                  'px-2 py-1 font-medium bg-neutral-100 hover:bg-neutral-200',
                  options.shapeType === 'outline' && '!bg-primary'
                )}
                onClick={() => setOptions({ ...options, shapeType: 'outline' })}
              >
                Outline
              </button>
            </div>
          </div>
        </div>
        <div className={mergeClass(style.optionsItem, 'border-l')}>
          <label>Background</label>
          <div className={style.optionsControl}>
            <ColorPicker
              id="pencil-options-color"
              color={options.fillColorHex}
              disabled={options.shapeType === 'outline'}
              onChange={(e) => handleChange(e, 'fillColorHex')}
            />
          </div>
        </div>
        <div className={mergeClass(style.optionsItem, 'border-l')}>
          <label>Border</label>
          <div className={style.optionsControl}>
            <SliderRange
              id="pencil-options-stroke-thickness"
              value={options.strokeThickness}
              min={1}
              max={100}
              step={1}
              onChange={(e) => handleChange(e, 'strokeThickness')}
            />
            <div className="text-xs font-medium w-4">
              {options.strokeThickness}
            </div>
            <ColorPicker
              id="pencil-options-color"
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

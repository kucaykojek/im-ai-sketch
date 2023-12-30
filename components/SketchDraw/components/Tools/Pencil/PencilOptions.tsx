import { PencilIcon } from 'lucide-react'
import { ChangeEvent } from 'react'

import ColorPicker from '@/sketch-draw/components/ColorPicker'
import SliderRange from '@/sketch-draw/components/SliderRange'
import style from '@/sketch-draw/components/Tools/Tools.module.css'
import usePencilOptions from '@/sketch-draw/store/object/usePencilOptions'
import { cn } from '@/sketch-draw/utils/common'

const PencilOptions = () => {
  const { options, setOptions } = usePencilOptions()

  const handleChange = (e: ChangeEvent<HTMLInputElement>, key: any) => {
    setOptions({ ...options, [key]: e.target.value })
  }
  return (
    <div className={style.toolOptions}>
      <div className={style.optionsTitle}>
        <PencilIcon />
        Pencil
      </div>
      <div className={style.optionsWrapper}>
        <div className={style.optionsItem}>
          <label>Thickness</label>
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
          </div>
        </div>
        <div className={cn(style.optionsItem, 'border-l')}>
          <label>Opacity</label>
          <div className={style.optionsControl}>
            <SliderRange
              id="pencil-options-opacity"
              value={options.opacity}
              min={1}
              max={100}
              step={1}
              onChange={(e) => handleChange(e, 'opacity')}
            />
            <div className="text-xs font-medium w-4">{options.opacity}</div>
          </div>
        </div>
        <div className={cn(style.optionsItem, 'border-l')}>
          <label>Color</label>
          <div className={style.optionsControl}>
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

export default PencilOptions

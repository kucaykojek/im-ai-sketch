import { HighlighterIcon } from 'lucide-react'
import { ChangeEvent } from 'react'

import ColorPicker from '@/sketch-draw/components/ColorPicker'
import SliderRange from '@/sketch-draw/components/SliderRange'
import style from '@/sketch-draw/components/Tools/Tools.module.css'
import useHighlighterOptions from '@/sketch-draw/store/object/useHighlighterOptions'
import { cn } from '@/sketch-draw/utils/common'

const HighlighterOptions = () => {
  const { options, setOptions } = useHighlighterOptions()

  const handleChange = (e: ChangeEvent<HTMLInputElement>, key: any) => {
    setOptions({ ...options, [key]: e.target.value })
  }
  return (
    <div className={style.toolOptions}>
      <div className={style.optionsTitle}>
        <HighlighterIcon />
        Highlighter
      </div>
      <div className={style.optionsWrapper}>
        <div className={style.optionsItem}>
          <label>Thickness</label>
          <div
            className={cn(style.optionsControl, 'flex items-center space-x-2')}
          >
            <SliderRange
              id="highlighter-options-stroke-thickness"
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
          <div
            className={cn(style.optionsControl, 'flex items-center space-x-2')}
          >
            <SliderRange
              id="highlighter-options-opacity"
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
              id="highlighter-options-color"
              color={options.strokeColorHex}
              onChange={(e) => handleChange(e, 'strokeColorHex')}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default HighlighterOptions

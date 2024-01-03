import { TypeIcon } from 'lucide-react'
import { ChangeEvent } from 'react'

import ColorPicker from '@/components/SketchDraw/components/ColorPicker'
import SliderRange from '@/components/SketchDraw/components/SliderRange'
import style from '@/components/SketchDraw/components/Tools/Tools.module.css'
import { cn } from '@/components/SketchDraw/utils/common'

const TextOptions = () => {
  // TODO:
  const options = { text: 'hello', fontColorHex: '#000000', fontSize: 10 }

  const handleChange = (e: ChangeEvent<HTMLInputElement>, key: any) => {
    console.info(e, key)
  }

  return (
    <div className={style.toolOptions}>
      <div className={style.optionsTitle}>
        <TypeIcon />
        Text
      </div>
      <div className={style.optionsWrapper}>
        <div className={style.optionsItem}>
          <div className={style.optionsControl}>
            <input
              type="text"
              name="text"
              value={options.text}
              className="outline-none border-2 border-neutral-200 px-2 h-10 rounded focus:border-primary"
              onChange={(e) => handleChange(e, 'text')}
            />
          </div>
        </div>
        <div className={cn(style.optionsItem, 'border-l')}>
          <div className={style.optionsItemLabel}>Font Color</div>
          <div className={style.optionsControl}>
            <ColorPicker
              id="text-options-color"
              color={options.fontColorHex}
              onChange={(e) => handleChange(e, 'fontColorHex')}
            />
          </div>
        </div>
        <div className={cn(style.optionsItem, 'border-l')}>
          <div className={style.optionsItemLabel}>Font Size</div>
          <div className={style.optionsControl}>
            <SliderRange
              id="text-options-stroke-thickness"
              value={options.fontSize}
              min={1}
              max={100}
              step={1}
              onChange={(e) => handleChange(e, 'fontSize')}
            />
            <div className="text-xs font-medium w-7">{options.fontSize}px</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TextOptions

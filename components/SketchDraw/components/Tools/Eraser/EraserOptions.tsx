import { EraserIcon } from 'lucide-react'
import { ChangeEvent } from 'react'

import SliderRange from '@/sketch-draw/components/SliderRange'
import style from '@/sketch-draw/components/Tools/Tools.module.css'
import useEraserOptions from '@/sketch-draw/store/object/useEraserOptions'

const EraserOptions = () => {
  const { options, setOptions } = useEraserOptions()

  const handleThicknessChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOptions({ ...options, strokeThickness: Number(e.target.value) })
  }

  return (
    <div className={style.toolOptions}>
      <div className={style.optionsTitle}>
        <EraserIcon />
        Eraser / Masking
      </div>
      <div className={style.optionsWrapper}>
        <div className={style.optionsItem}>
          <div className={style.optionsItemLabel}>Thickness</div>
          <div className={style.optionsControl}>
            <SliderRange
              id="eraser-options-stroke-thickness"
              value={options.strokeThickness || 1}
              min={1}
              max={100}
              step={1}
              onChange={handleThicknessChange}
            />
            <div className="text-xs font-medium w-4">
              {options.strokeThickness || 1}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EraserOptions

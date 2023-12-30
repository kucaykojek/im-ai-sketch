import { TypeIcon } from 'lucide-react'
import { ChangeEvent, useEffect } from 'react'

import ColorPicker from '@/sketch-draw/components/ColorPicker'
import SliderRange from '@/sketch-draw/components/SliderRange'
import style from '@/sketch-draw/components/Tools/Tools.module.css'
import useTextOptions from '@/sketch-draw/store/object/useTextOptions'
import useActiveObjectId from '@/sketch-draw/store/useActiveObjectId'
import useCanvasObjects from '@/sketch-draw/store/useCanvasObjects'
import { cn } from '@/sketch-draw/utils/common'
import getCanvasObjectById from '@/sketch-draw/utils/getCanvasObjectById'

const TextOptions = () => {
  const { options, setOptions } = useTextOptions()
  const { activeObjectId } = useActiveObjectId()
  const { canvasObjects, updateCanvasObject } = useCanvasObjects()

  const handleChange = (e: ChangeEvent<HTMLInputElement>, key: any) => {
    setOptions({ ...options, [key]: e.target.value })
  }

  useEffect(() => {
    // Update canvas object
    if (
      !!activeObjectId &&
      getCanvasObjectById(activeObjectId, canvasObjects)?.type === 'text'
    ) {
      updateCanvasObject(activeObjectId, { textOpts: options })
    }
  }, [options])

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
              value={options.text}
              className="outline-none border-2 border-neutral-200 px-2 h-10 rounded focus:border-primary"
              onChange={(e) => handleChange(e, 'text')}
            />
          </div>
        </div>
        <div className={cn(style.optionsItem, 'border-l')}>
          <label>Font Color</label>
          <div className={style.optionsControl}>
            <ColorPicker
              id="text-options-color"
              color={options.fontColorHex}
              onChange={(e) => handleChange(e, 'fontColorHex')}
            />
          </div>
        </div>
        <div className={cn(style.optionsItem, 'border-l')}>
          <label>Font Size</label>
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

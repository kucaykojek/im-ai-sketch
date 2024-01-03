import { PencilIcon } from 'lucide-react'
import { ChangeEvent, useEffect } from 'react'

import ColorPicker from '@/components/SketchDraw/components/ColorPicker'
import SliderRange from '@/components/SketchDraw/components/SliderRange'
import style from '@/components/SketchDraw/components/Tools/Tools.module.css'
import usePencilOptions from '@/components/SketchDraw/store/object/usePencilOptions'
import useActiveObjectId from '@/components/SketchDraw/store/useActiveObjectId'
import useCanvasObjects from '@/components/SketchDraw/store/useCanvasObjects'
import { cn } from '@/components/SketchDraw/utils/common'
import getCanvasObjectById from '@/components/SketchDraw/utils/getCanvasObjectById'

const PencilOptions = () => {
  const { options, setOptions } = usePencilOptions()
  const { activeObjectId } = useActiveObjectId()
  const { canvasObjects, updateCanvasObject } = useCanvasObjects()

  const handleChange = (e: ChangeEvent<HTMLInputElement>, key: any) => {
    setOptions({ ...options, [key]: e.target.value })
  }

  useEffect(() => {
    // Update canvas object
    if (
      !!activeObjectId &&
      getCanvasObjectById(activeObjectId, canvasObjects)?.type === 'pencil'
    ) {
      updateCanvasObject(activeObjectId, { pencilOpts: options })
    }
  }, [options])

  return (
    <div className={style.toolOptions}>
      <div className={style.optionsTitle}>
        <PencilIcon />
        Pencil
      </div>
      <div className={style.optionsWrapper}>
        <div className={style.optionsItem}>
          <div className={style.optionsItemLabel}>Thickness</div>
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
          <div className={style.optionsItemLabel}>Opacity</div>
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
          <div className={style.optionsItemLabel}>Color</div>
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

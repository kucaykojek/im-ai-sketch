import { HighlighterIcon } from 'lucide-react'
import { ChangeEvent, useEffect } from 'react'

import ColorPicker from '@/components/SketchDraw/components/ColorPicker'
import SliderRange from '@/components/SketchDraw/components/SliderRange'
import style from '@/components/SketchDraw/components/Tools/Tools.module.css'
import useHighlighterOptions from '@/components/SketchDraw/store/object/useHighlighterOptions'
import useActiveObjectId from '@/components/SketchDraw/store/useActiveObjectId'
import useCanvasObjects from '@/components/SketchDraw/store/useCanvasObjects'
import { cn } from '@/components/SketchDraw/utils/common'
import getCanvasObjectById from '@/components/SketchDraw/utils/getCanvasObjectById'

const HighlighterOptions = () => {
  const { options, setOptions } = useHighlighterOptions()
  const { activeObjectId } = useActiveObjectId()
  const { canvasObjects, updateCanvasObject } = useCanvasObjects()

  const handleChange = (e: ChangeEvent<HTMLInputElement>, key: any) => {
    setOptions({ ...options, [key]: e.target.value })
  }

  useEffect(() => {
    // Update canvas object
    if (
      !!activeObjectId &&
      getCanvasObjectById(activeObjectId, canvasObjects)?.type === 'highlighter'
    ) {
      updateCanvasObject(activeObjectId, { highlighterOpts: options })
    }
  }, [options])

  return (
    <div className={style.toolOptions}>
      <div className={style.optionsTitle}>
        <HighlighterIcon />
        Highlighter
      </div>
      <div className={style.optionsWrapper}>
        <div className={style.optionsItem}>
          <div className={style.optionsItemLabel}>Thickness</div>
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
          <div className={style.optionsItemLabel}>Opacity</div>
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
          <div className={style.optionsItemLabel}>Color</div>
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

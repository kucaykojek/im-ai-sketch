import { PencilIcon } from 'lucide-react'
import { useEffect } from 'react'

import ColorPicker from '@/components/SketchDraw/components/ColorPicker'
import SliderRange from '@/components/SketchDraw/components/SliderRange'
import style from '@/components/SketchDraw/components/Tools/Tools.module.css'
import { PENCIL_OPTIONS_DEFAULT } from '@/components/SketchDraw/data/constants'
import { PencilObject } from '@/components/SketchDraw/data/types'
import usePencilOptions from '@/components/SketchDraw/store/object/usePencilOptions'
import useCanvas from '@/components/SketchDraw/store/useCanvas'
import { cn } from '@/components/SketchDraw/utils/common'
import { isPencilObject } from '@/components/SketchDraw/utils/object'

const PencilOptions = () => {
  const { options, setOptions } = usePencilOptions()
  const { canvas, selectedObjects } = useCanvas()

  const handleChangeOptions = (key: any, value: any) => {
    setOptions({ ...options, [key]: value })
  }

  useEffect(() => {
    if (isPencilObject(selectedObjects?.[0])) {
      setOptions({
        ...PENCIL_OPTIONS_DEFAULT,
        color: ((selectedObjects[0] as PencilObject).stroke ||
          PENCIL_OPTIONS_DEFAULT.color) as string,
        width:
          (selectedObjects[0] as PencilObject).strokeWidth ||
          PENCIL_OPTIONS_DEFAULT.width
      })
    }
  }, [selectedObjects, setOptions])

  useEffect(() => {
    if (canvas && selectedObjects.length > 0) {
      // Change objects based on options
      canvas
        .getActiveObjects()
        .filter((obj) => isPencilObject(obj))
        .forEach((obj) => {
          obj.set({ stroke: options.color, strokeWidth: options.width })
        })

      canvas.requestRenderAll()
    }
  }, [canvas, selectedObjects, options])

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
              value={options.width}
              min={1}
              max={100}
              step={1}
              onChange={(e) =>
                handleChangeOptions('width', Number(e.target.value))
              }
            />
            <div className="text-xs font-medium w-4">{options.width}</div>
          </div>
        </div>
        <div className={cn(style.optionsItem, 'border-l')}>
          <div className={style.optionsItemLabel}>Color</div>
          <div className={style.optionsControl}>
            <ColorPicker
              id="pencil-options-color"
              color={options.color}
              onChange={(e) => handleChangeOptions('color', e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PencilOptions

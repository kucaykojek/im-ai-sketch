import { EraserIcon } from 'lucide-react'
import { useEffect } from 'react'

import { ERASER_OPTIONS_DEFAULT } from '../../../data/constants'
import { EraserObject } from '../../../data/types'
import useSketchDrawStore from '../../../store/SketchDraw.store'
import useEraserOptions from '../../../store/options/EraserOptions.store'
import { isEraserObject } from '../../../utils/object'
import SliderRange from '../../SliderRange'
import style from '../Tools.module.css'

const EraserOptions = () => {
  const { options, setOptions } = useEraserOptions()
  const { canvas, selectedObjects } = useSketchDrawStore()

  const handleChangeOptions = (key: any, value: any) => {
    setOptions({ ...options, [key]: value })
  }

  useEffect(() => {
    if (isEraserObject(selectedObjects?.[0])) {
      setOptions({
        ...ERASER_OPTIONS_DEFAULT,
        width:
          (selectedObjects[0] as EraserObject).strokeWidth ||
          ERASER_OPTIONS_DEFAULT.width
      })
    }
  }, [selectedObjects, setOptions])

  useEffect(() => {
    if (canvas && selectedObjects.length > 0) {
      // Change objects based on options
      canvas
        .getActiveObjects()
        .filter((obj) => isEraserObject(obj))
        .forEach((obj) => {
          obj.set({ strokeWidth: options.width })
        })

      canvas.requestRenderAll()
    }
  }, [canvas, selectedObjects, options])

  return (
    <div className={style.toolOptions}>
      <div className={style.optionsTitle}>
        <EraserIcon />
        Masking / Eraser
      </div>
      <div className={style.optionsWrapper}>
        <div className={style.optionsItem}>
          <div className={style.optionsItemLabel}>Thickness</div>
          <div className={style.optionsControl}>
            <SliderRange
              id="eraser-options-stroke-thickness"
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
      </div>
    </div>
  )
}

export default EraserOptions

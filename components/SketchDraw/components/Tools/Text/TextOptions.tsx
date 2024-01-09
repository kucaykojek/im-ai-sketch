import { pick } from 'lodash'
import {
  BoldIcon,
  ItalicIcon,
  StrikethroughIcon,
  TextIcon,
  UnderlineIcon
} from 'lucide-react'
import { useEffect, useState } from 'react'

import { OBJECT_DEFAULT } from '../../../data/constants'
import type { TextObject } from '../../../data/types'
import useSketchDrawStore from '../../../store/SketchDraw.store'
import useTextOptions from '../../../store/options/TextOptions.store'
import { cn } from '../../../utils/common'
import getAvailableFonts from '../../../utils/fonts'
import ColorPicker from '../../ColorPicker'
import style from '../Tools.module.css'

const TextOptions = () => {
  const [fonts, setFonts] = useState<string[]>([])
  const { options, setOptions } = useTextOptions()
  const { canvas, selectedObjects } = useSketchDrawStore()

  const handleChangeOptions = (key: any, value: any) => {
    setOptions({ ...options, [key]: value })
  }

  const getFonts = async () => {
    const availableFonts = await getAvailableFonts()
    setFonts(availableFonts!)
  }

  useEffect(() => {
    if (selectedObjects?.[0]?.type === 'textbox') {
      setOptions({
        ...(pick(selectedObjects?.[0], [
          'text',
          'fontFamily',
          'fontWeight',
          'fontStyle',
          'underline',
          'linethrough',
          'fill'
        ]) as TextObject)
      })
    }
  }, [selectedObjects, setOptions])

  useEffect(() => {
    if (canvas && selectedObjects.length > 0) {
      // Change objects based on options
      canvas
        .getActiveObjects()
        .filter((obj) => obj.type === 'textbox')
        .forEach((obj) => {
          obj.set({ ...options })
        })

      canvas.requestRenderAll()
    }
  }, [canvas, selectedObjects, options])

  useEffect(() => {
    getFonts()
  }, [])

  return (
    <div className={style.toolOptions}>
      <div className={style.optionsTitle}>
        <TextIcon />
        Text
      </div>
      <div className={style.optionsWrapper}>
        <div className={style.optionsItem}>
          <div className={style.optionsItemLabel}>Font</div>
          <div className={style.optionsControl}>
            <select
              value={options.fontFamily}
              className="outline-none border-2 border-neutral-200 focus:border-primary rounded px-1 h-7 text-xs"
              onChange={(e) =>
                handleChangeOptions('fontFamily', e.target.value)
              }
            >
              {fonts.map((font, index) => (
                <option key={`font-family-${index}`} value={font}>
                  {font}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className={cn(style.optionsItem, 'border-l')}>
          <div className={style.optionsItemLabel}>Style</div>
          <div className={style.optionsControl}>
            <div className="flex items-center text-xs rounded overflow-hidden">
              <button
                type="button"
                className={cn(
                  'w-8 h-6 flex items-center justify-center font-medium bg-neutral-100 hover:bg-neutral-200',
                  options.fontWeight === 'bold' && '!bg-primary'
                )}
                onClick={() =>
                  handleChangeOptions(
                    'fontWeight',
                    options.fontWeight === 'bold' ? 'normal' : 'bold'
                  )
                }
              >
                <BoldIcon className="w-4 h-4" />
              </button>
              <button
                type="button"
                className={cn(
                  'w-8 h-6 flex items-center justify-center font-medium bg-neutral-100 hover:bg-neutral-200',
                  options.fontStyle === 'italic' && '!bg-primary'
                )}
                onClick={() =>
                  handleChangeOptions(
                    'fontStyle',
                    options.fontStyle === 'italic' ? 'normal' : 'italic'
                  )
                }
              >
                <ItalicIcon className="w-4 h-4" />
              </button>
              <button
                type="button"
                className={cn(
                  'w-8 h-6 flex items-center justify-center font-medium bg-neutral-100 hover:bg-neutral-200',
                  options.underline && '!bg-primary'
                )}
                onClick={() =>
                  handleChangeOptions('underline', !options.underline)
                }
              >
                <UnderlineIcon className="w-4 h-4" />
              </button>
              <button
                type="button"
                className={cn(
                  'w-8 h-6 flex items-center justify-center font-medium bg-neutral-100 hover:bg-neutral-200',
                  options.linethrough && '!bg-primary'
                )}
                onClick={() =>
                  handleChangeOptions('linethrough', !options.linethrough)
                }
              >
                <StrikethroughIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
        <div className={cn(style.optionsItem, 'border-l')}>
          <div className={style.optionsItemLabel}>Color</div>
          <div className={style.optionsControl}>
            <ColorPicker
              id="text-options-fill-color"
              color={
                options.fill === 'transparent'
                  ? OBJECT_DEFAULT.color
                  : (options.fill as string)
              }
              disabled={options.fill === 'transparent'}
              onChange={(e) => handleChangeOptions('fill', e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TextOptions

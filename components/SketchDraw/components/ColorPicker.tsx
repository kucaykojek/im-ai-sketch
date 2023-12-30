import { ChangeEvent } from 'react'

import mergeClass from '@/sketch-draw/utils/mergeClass'

type Props = {
  id: string
  color: string
  disabled?: boolean
  onChange: (_: ChangeEvent<HTMLInputElement>) => void
}

const ColorPicker = ({ id, color, disabled = false, onChange }: Props) => {
  return (
    <div>
      <label
        htmlFor={id}
        className={mergeClass(
          'flex items-center bg-neutral-100 hover:bg-neutral-200 rounded p-1 space-x-2 w-24 cursor-pointer',
          disabled && 'opacity-50'
        )}
      >
        <span
          className="block w-4 h-4 rounded-full shrink-0"
          style={{ background: color }}
        ></span>
        <span className="block text-xs shrink-0">{color}</span>
        <input
          id={id}
          type="color"
          value={color}
          disabled={disabled}
          className="invisible w-0 h-0 opacity-0"
          onChange={onChange}
        />
      </label>
    </div>
  )
}

export default ColorPicker

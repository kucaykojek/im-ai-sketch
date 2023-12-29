import { ChangeEvent } from 'react'

import useSelectedColor from '../../../store/useSelectedColor'
import mergeClass from '../../../utils/mergeClass'
import style from '../Tools.module.css'

const Picker = () => {
  const disabled = false
  const { setSelectedColor } = useSelectedColor()

  const handleChange = (e: ChangeEvent) => {
    const color = (e.target as HTMLInputElement).value
    setSelectedColor(color)
  }

  return (
    <label
      htmlFor="colorPicker"
      className={mergeClass(style.colorPicker, disabled && 'opacity-50')}
    >
      <input
        id="colorPicker"
        type="color"
        onChange={handleChange}
        disabled={disabled}
      />
    </label>
  )
}

export default Picker

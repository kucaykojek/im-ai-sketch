import { ChangeEvent } from 'react'

import useSketchDrawContext from '../../../SketchDraw.context'
import useSelectedColor from '../../../store/useSelectedColor'
import mergeClass from '../../../utils/mergeClass'
import style from '../Tools.module.css'

const Picker = () => {
  const { canvasRef } = useSketchDrawContext()
  const { setSelectedColor } = useSelectedColor()

  const handleChange = (e: ChangeEvent) => {
    const color = (e.target as HTMLInputElement).value
    setSelectedColor(color)
  }

  return (
    <label
      htmlFor="colorPicker"
      className={mergeClass(style.colorPicker, !canvasRef && 'opacity-50')}
    >
      <input
        id="colorPicker"
        type="color"
        onChange={handleChange}
        disabled={!canvasRef}
      />
    </label>
  )
}

export default Picker

import { ChangeEvent } from 'react'

import { cn } from '@/libs/utils'

import { useSketchDrawerContext } from '../../SketchDrawer.context'
import useSketchDrawerStore from '../../SketchDrawer.store'
import style from '../Tools.module.css'

const Picker = () => {
  const { instance } = useSketchDrawerContext()
  const { setSelectedColor } = useSketchDrawerStore()

  const handleChange = (e: ChangeEvent) => {
    const color = (e.target as HTMLInputElement).value
    setSelectedColor(color)
    instance!.saveColor(color)
  }

  return (
    <label
      htmlFor="colorPicker"
      className={cn(style.colorPicker, !instance && 'opacity-50')}
    >
      <input
        id="colorPicker"
        type="color"
        onChange={handleChange}
        disabled={!instance}
      />
    </label>
  )
}

export default Picker

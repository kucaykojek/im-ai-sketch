import { cn } from '@/libs/utils'

import { useSketchDrawerContext } from '../../../SketchDrawer.context'
import useSketchDrawerStore from '../../../SketchDrawer.store'
import { COLORS } from '../../../data/constants'
import style from '../Tools.module.css'

const Palette = () => {
  const { instance } = useSketchDrawerContext()
  const { selectedColor, setSelectedColor } = useSketchDrawerStore()

  const handleClick = (color: string) => {
    setSelectedColor(color)
    instance!.saveColor(color)
  }

  return (
    <>
      {COLORS.map((color, index) => (
        <button
          key={`palette-${index}`}
          title={color}
          className={cn(
            style.palette,
            selectedColor === color && style.paletteActive
          )}
          style={{ backgroundColor: color }}
          disabled={!instance}
          onClick={() => handleClick(color)}
        ></button>
      ))}
    </>
  )
}

export default Palette

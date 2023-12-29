import { PALETTE_COLORS } from '../../../data/constants'
import useSelectedColor from '../../../store/useSelectedColor'
import mergeClass from '../../../utils/mergeClass'
import style from '../Tools.module.css'

const Palette = () => {
  const disabled = false
  const { selectedColor, setSelectedColor } = useSelectedColor()

  const handleClick = (color: string) => {
    setSelectedColor(color)
  }

  return (
    <>
      {PALETTE_COLORS.map((color, index) => (
        <button
          key={`palette-${index}`}
          title={color}
          className={mergeClass(
            style.palette,
            selectedColor === color && style.paletteActive
          )}
          style={{ backgroundColor: color }}
          disabled={disabled}
          onClick={() => handleClick(color)}
        ></button>
      ))}
    </>
  )
}

export default Palette

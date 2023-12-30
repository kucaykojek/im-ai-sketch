import { ChangeEvent } from 'react'

type Props = {
  id: string
  step: number
  min?: number
  max?: number
  disabled?: boolean
  value: number
  onChange: (_: ChangeEvent<HTMLInputElement>) => void
}

const SliderRange = ({
  id,
  step,
  min,
  max,
  disabled = false,
  value,
  onChange
}: Props) => {
  return (
    <>
      <input
        id={id}
        type="range"
        value={value}
        step={step}
        min={min}
        max={max}
        disabled={disabled}
        className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer"
        onChange={onChange}
      />
    </>
  )
}

export default SliderRange

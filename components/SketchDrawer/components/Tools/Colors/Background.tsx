import { ChangeEvent } from 'react'

import { cn } from '@/libs/utils'

import { useSketchDrawerContext } from '../../../SketchDrawer.context'
import useSketchDrawerStore from '../../../SketchDrawer.store'
import style from '../Tools.module.css'

const Background = () => {
  const { instance } = useSketchDrawerContext()
  const { canvasBg, setCanvasBg } = useSketchDrawerStore()

  const handleChange = (e: ChangeEvent) => {
    const color = (e.target as HTMLInputElement).value
    setCanvasBg(color)
    instance!.saveBg(color)
  }

  return (
    <label
      htmlFor="backgroundPicker"
      className={cn(style.backgroundPicker, !instance && 'opacity-50')}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-paint-bucket"
      >
        <path d="m19 11-8-8-8.6 8.6a2 2 0 0 0 0 2.8l5.2 5.2c.8.8 2 .8 2.8 0L19 11Z" />
        <path d="m5 2 5 5" />
        <path d="M2 13h15" />
        <path
          d="M22 20a2 2 0 1 1-4 0c0-1.6 1.7-2.4 2-4 .3 1.6 2 2.4 2 4Z"
          fill={canvasBg}
        />
      </svg>
      <input
        id="backgroundPicker"
        type="color"
        onChange={handleChange}
        disabled={!instance}
      />
    </label>
  )
}

export default Background

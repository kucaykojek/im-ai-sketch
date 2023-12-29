import { PaletteIcon } from 'lucide-react'
import { useState } from 'react'

import { Tools, useSketchDrawContext } from '@/components/SketchDraw'
import { cn } from '@/libs/utils'

import style from '../Dock.module.css'

const ColorTools = () => {
  const [isActive, setIsActive] = useState(true)
  const { canvasRef } = useSketchDrawContext()

  return (
    <>
      <div className={cn(style.toolGroup, isActive && style.toolGroupActive)}>
        <button
          className={cn(
            style.toolGroupButton,
            style.toolGroupButton,
            '!text-branding-blue hover:!bg-branding-blue hover:!text-white',
            isActive && '!bg-branding-blue !text-white'
          )}
          title="Freehand"
          onClick={() => setIsActive(!isActive)}
        >
          <PaletteIcon />
        </button>
        <div className={style.toolItems}>
          {canvasRef ? (
            <>
              <Tools.Palette />
              <Tools.Picker />
            </>
          ) : (
            <div className="animate-pulse rounded-lg bg-neutral-300 h-8 w-32"></div>
          )}
        </div>
      </div>

      {canvasRef ? (
        <Tools.Background />
      ) : (
        <div className="animate-pulse rounded-full bg-neutral-300 h-8 w-8"></div>
      )}
    </>
  )
}

export default ColorTools

'use client'

import { AudioWaveformIcon } from 'lucide-react'
import { useState } from 'react'

import { Tools, useSketchDrawContext } from '@/components/SketchDraw'
import { cn } from '@/libs/utils'

import style from '../Toolbar.module.css'

const FreeDrawTools = () => {
  const [isActive, setIsActive] = useState(true)
  const { canvasRef } = useSketchDrawContext()

  return (
    <div className={cn(style.toolGroup, isActive && style.toolGroupActive)}>
      <button
        className={cn(
          style.toolGroupButton,
          '!text-branding-pink hover:!bg-branding-pink hover:!text-white',
          isActive && '!bg-branding-pink !text-white'
        )}
        title="Freehand"
        onClick={() => setIsActive(!isActive)}
      >
        <AudioWaveformIcon />
      </button>
      <div className={style.toolItems}>
        {canvasRef ? (
          <>
            <Tools.Pencil />
            <Tools.Highlighter />
            <Tools.Eraser />
          </>
        ) : (
          <div className="animate-pulse rounded-lg bg-neutral-300 h-8 w-32"></div>
        )}
      </div>
    </div>
  )
}

export default FreeDrawTools

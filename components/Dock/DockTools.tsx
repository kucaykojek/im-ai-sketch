'use client'

import { AudioWaveformIcon, PaletteIcon, ShapesIcon } from 'lucide-react'
import { useState } from 'react'

import {
  Tools as SketchDrawTool,
  useSketchDrawContext
} from '@/components/SketchDraw'
import { cn } from '@/libs/utils'

import style from './Dock.module.css'

const DockTools = () => {
  const { isReady } = useSketchDrawContext()
  const [isActiveFreeDraw, setIsActiveFreeDraw] = useState(true)
  const [isActiveShape, setIsActiveShape] = useState(true)
  const [isActiveColor, setIsActiveColor] = useState(true)

  return (
    <>
      <div
        className={cn(
          style.toolGroup,
          isActiveFreeDraw && style.toolGroupActive
        )}
      >
        <button
          className={cn(
            style.toolGroupButton,
            '!text-branding-cyan hover:!bg-branding-cyan hover:!text-white',
            isActiveFreeDraw && '!bg-branding-cyan !text-white'
          )}
          title="Free Draw"
          onClick={() => setIsActiveFreeDraw(!isActiveFreeDraw)}
        >
          <AudioWaveformIcon />
        </button>
        <div className={style.toolItems}>
          {isReady ? (
            <>
              <SketchDrawTool.Pencil />
              <SketchDrawTool.Highlighter />
              <SketchDrawTool.Eraser />
            </>
          ) : (
            <div className="animate-pulse rounded-lg bg-neutral-300 h-8 w-28"></div>
          )}
        </div>
      </div>

      <div
        className={cn(style.toolGroup, isActiveShape && style.toolGroupActive)}
      >
        <button
          className={cn(
            style.toolGroupButton,
            '!text-branding-pink hover:!bg-branding-pink hover:!text-white',
            isActiveShape && '!bg-branding-pink !text-white'
          )}
          title="Shape"
          onClick={() => setIsActiveShape(!isActiveShape)}
        >
          <ShapesIcon />
        </button>
        <div className={style.toolItems}>
          {isReady ? (
            <>
              <SketchDrawTool.Square />
              <SketchDrawTool.Circle />
              <SketchDrawTool.Triangle />
            </>
          ) : (
            <div className="animate-pulse rounded-lg bg-neutral-300 h-8 w-28"></div>
          )}
        </div>
      </div>

      <div
        className={cn(style.toolGroup, isActiveColor && style.toolGroupActive)}
      >
        <button
          className={cn(
            style.toolGroupButton,
            style.toolGroupButton,
            '!text-branding-blue hover:!bg-branding-blue hover:!text-white',
            isActiveColor && '!bg-branding-blue !text-white'
          )}
          title="Color"
          onClick={() => setIsActiveColor(!isActiveColor)}
        >
          <PaletteIcon />
        </button>
        <div className={style.toolItems}>
          {isReady ? (
            <>
              <SketchDrawTool.ColorPalette />
            </>
          ) : (
            <div className="animate-pulse rounded-lg bg-neutral-300 h-8 w-48"></div>
          )}
        </div>
      </div>

      <div className="border-l flex items-center space-x-2 pl-2">
        {isReady ? (
          <>
            <SketchDrawTool.Text />
            <SketchDrawTool.Image />
          </>
        ) : (
          <>
            <div className="animate-pulse rounded-lg bg-neutral-300 h-8 w-8"></div>
            <div className="animate-pulse rounded-lg bg-neutral-300 h-8 w-8"></div>
          </>
        )}
      </div>
    </>
  )
}

export default DockTools

'use client'

import { AudioWaveformIcon, PaletteIcon, ShapesIcon } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import React from 'react'

import { Tools } from '@/components/SketchDrawer'
import { useSketchDrawerContext } from '@/components/SketchDrawer/SketchDrawer.context'
import { cn } from '@/libs/utils'

import style from './Toolbar.module.css'

const Toolbar = () => {
  const [isShapesActive, setIsShapesActive] = useState(false)
  const [isFreehandActive, setIsFreehandActive] = useState(true)
  const [isColorActive, setIsColorActive] = useState(true)

  const { instance } = useSketchDrawerContext()

  return (
    <div className={style.toolbarWrapper}>
      <Image
        src="/logo.webp"
        alt="designs.ai"
        width="122"
        height="24"
        className={style.toolbarLogo}
      />

      <div className={style.toolWrapper}>
        <div
          className={cn(
            style.toolGroup,
            isShapesActive && style.toolGroupActive
          )}
        >
          <button
            className={cn(
              style.toolGroupButton,
              '!text-branding-cyan hover:!bg-branding-cyan hover:!text-white',
              isShapesActive && '!bg-branding-cyan !text-white'
            )}
            title="Freehand"
            onClick={() => setIsShapesActive(!isShapesActive)}
          >
            <ShapesIcon />
          </button>
          <div className={style.toolItems}>
            {instance ? (
              <>
                <Tools.Square />
                <Tools.Circle />
                <Tools.Triangle />
              </>
            ) : (
              <div className="animate-pulse rounded-lg bg-neutral-300 h-8 w-32"></div>
            )}
          </div>
        </div>

        <div
          className={cn(
            style.toolGroup,
            isFreehandActive && style.toolGroupActive
          )}
        >
          <button
            className={cn(
              style.toolGroupButton,
              '!text-branding-pink hover:!bg-branding-pink hover:!text-white',
              isFreehandActive && '!bg-branding-pink !text-white'
            )}
            title="Freehand"
            onClick={() => setIsFreehandActive(!isFreehandActive)}
          >
            <AudioWaveformIcon />
          </button>
          <div className={style.toolItems}>
            {instance ? (
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

        <div
          className={cn(
            style.toolGroup,
            isColorActive && style.toolGroupActive
          )}
        >
          <button
            className={cn(
              style.toolGroupButton,
              style.toolGroupButton,
              '!text-branding-blue hover:!bg-branding-blue hover:!text-white',
              isColorActive && '!bg-branding-blue !text-white'
            )}
            title="Freehand"
            onClick={() => setIsColorActive(!isColorActive)}
          >
            <PaletteIcon />
          </button>
          <div className={style.toolItems}>
            {instance ? (
              <>
                <Tools.Palette />
                <Tools.Picker />
              </>
            ) : (
              <div className="animate-pulse rounded-lg bg-neutral-300 h-8 w-32"></div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Toolbar

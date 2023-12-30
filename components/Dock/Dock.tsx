'use client'

import Image from 'next/image'
import React from 'react'

import { Tools } from '@/components//SketchDraw'

import style from './Dock.module.css'
import { ColorTools, FreeDrawTools, ShapeTools } from './components'
import ToolOptions from './components/ToolOptions'

const Dock = () => {
  return (
    <>
      <ToolOptions />

      <div className={style.toolbarWrapper}>
        <Image
          src="/logo.webp"
          alt="designs.ai"
          width="122"
          height="24"
          className={style.toolbarLogo}
          priority
        />

        <div className={style.toolWrapper}>
          <FreeDrawTools />
          <ShapeTools />
          <ColorTools />
          <div className="border-l flex items-center space-x-2 pl-2">
            <Tools.Text />
            <Tools.Image />
          </div>
        </div>
      </div>
    </>
  )
}

export default Dock

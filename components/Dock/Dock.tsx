'use client'

import Image from 'next/image'
import React from 'react'

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
          <ShapeTools />
          <FreeDrawTools />
          <ColorTools />
        </div>
      </div>
    </>
  )
}

export default Dock

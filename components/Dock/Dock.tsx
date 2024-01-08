'use client'

import Image from 'next/image'
import React from 'react'

import style from './Dock.module.css'
import DockOptionsDrawer from './DockOptionsDrawer'
import DockTools from './DockTools'

const Dock = () => {
  return (
    <div className={style.container}>
      <DockOptionsDrawer />

      <div className={style.toolbar}>
        <Image
          src="/logo.webp"
          alt="designs.ai"
          width="122"
          height="24"
          className={style.toolbarLogo}
          priority
        />

        <div className={style.toolWrapper}>
          <DockTools />
        </div>
      </div>
    </div>
  )
}

export default Dock
